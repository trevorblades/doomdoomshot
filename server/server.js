const http = require('http');
const {promisify} = require('util');
const express = require('express');
const flatten = require('flat');
const io = require('socket.io');
const redis = require('redis');
const shortid = require('shortid');
const {
  MAX_HEALTH,
  MAX_AMMO,
  PLAY_RELOAD,
  PLAY_BLOCK,
  PLAY_SHOOT,
} = require('../app/constants');

const app = express();
const server = http.createServer(app);
const websocket = io(server);

const client = redis.createClient();
const delAsync = promisify(client.del).bind(client);
const spopAsync = promisify(client.spop).bind(client);
const saddAsync = promisify(client.sadd).bind(client);
const hsetAsync = promisify(client.hset).bind(client);
const hmsetAsync = promisify(client.hmset).bind(client);
const hgetallAsync = promisify(client.hgetall).bind(client);

function dispatch(game, state = {}) {
  websocket.to(game.id).send({
    ...state,
    game,
  });
}

function joinGame(game, socket) {
  // Promisify this so that we can wait for all players to join before
  // dispatching the initial game state
  return new Promise(resolve =>
    socket.join(game.id, async error => {
      if (error) {
        throw error;
      }

      socket.on('message', async message => {
        await hsetAsync(game.id, `${socket.id}.selected`, message);
        const state = await hgetallAsync(game.id);
        socket.send({
          game: flatten.unflatten(state),
        });
      });

      socket.on('disconnect', async () => {
        websocket.in(game.id).clients((error, clients) => {
          // Find the other client and disconnect it, too
          const client = websocket.sockets.connected[clients[0]];
          if (client) {
            client.disconnect(true);
          }
        });

        // This will only be > 0 after the initial deletion
        const deleted = await delAsync(game.id);
        if (deleted) {
          console.log('save the game');
        }
      });

      resolve();
    })
  );
}

const QUEUE_KEY = 'queue';
const TICK_DURATION = 3000; // Time between ticks in milliseconds
const defaultPlayerState = {
  selected: PLAY_BLOCK,
  health: MAX_HEALTH,
  ammo: 0,
};

websocket.on('connection', async socket => {
  // A new connection was made! We need to try to match this player up with an
  // opponent. First, we grab a random opponent and remove them from the queue
  const opponent = await spopAsync(QUEUE_KEY);
  if (!opponent) {
    // If there aren't any opponents, add the current user to the queue
    await saddAsync(QUEUE_KEY, socket.id);
    socket.send({status: 'Waiting for opponent...'});
    socket.on('disconnect', () => client.srem(QUEUE_KEY, socket.id));
    return;
  }

  // Since we were able to find an opponent, we set up the initial game state
  const game = {
    id: shortid.generate(),
    player1: opponent,
    player2: socket.id,
    [socket.id]: defaultPlayerState,
    [opponent]: defaultPlayerState,
  };

  // Save the initial game state and let the opponent know about it
  await hmsetAsync(game.id, flatten(game));
  await Promise.all([
    joinGame(game, socket),
    joinGame(game, websocket.sockets.connected[opponent]),
  ]);

  // Set up the game heartbeat
  const heartbeat = setInterval(async () => {
    const now = Date.now();
    const nextTick = now + TICK_DURATION;

    const flattened = await hgetallAsync(game.id);
    const state = flatten.unflatten(flattened);
    [state.player1, state.player2].forEach(key => {
      const player = state[key];
      switch (player.selected) {
        case PLAY_RELOAD:
          player.ammo = Math.min(MAX_AMMO, Number(player.ammo) + 1);
          break;
        case PLAY_SHOOT:
          player.ammo = Math.max(0, Number(player.ammo) - 1);
          break;
        case PLAY_BLOCK:
        default:
          break;
      }

      player.play = player.selected;
      player.selected = defaultPlayerState.selected;
    });

    await hmsetAsync(game.id, flatten(state));
    dispatch(state, {
      nextTick,
      lastTick: now,
    });
  }, TICK_DURATION);

  const now = Date.now();
  dispatch(game, {
    status: 'Connected',
    ammo: 0,
    lastTick: now,
    nextTick: now + TICK_DURATION,
  });

  // Clear the heartbeat when this socket disconnects
  socket.on('disconnect', () => clearInterval(heartbeat));
});

server.listen(process.env.PORT, () =>
  console.log(`listening on port ${process.env.PORT}`)
);
