const http = require('http');
const {promisify} = require('util');
const express = require('express');
const flatten = require('flat');
const io = require('socket.io');
const redis = require('redis');
const shortid = require('shortid');
const {ACTION_RELOAD, ACTION_BLOCK, ACTION_SHOOT} = require('../app/common');

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
const MAX_ROUNDS = 100;
const MAX_AMMO = 5;
const MAX_HEALTH = 3;
const defaultPlayerState = {
  selected: ACTION_BLOCK,
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
    round: 1,
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
    const nextRound = Number(state.round) + 1;
    let gameOver = nextRound > MAX_ROUNDS;
    const other = {
      [state.player1]: state.player2,
      [state.player2]: state.player1,
    };

    [state.player1, state.player2]
      .map(key => {
        const player = state[key];
        const ammo = Number(player.ammo);
        switch (player.selected) {
          case ACTION_RELOAD:
            player.ammo = Math.min(MAX_AMMO, ammo + 1);
            break;
          case ACTION_SHOOT:
            player.ammo = Math.max(0, ammo - 1);
            break;
          default:
            break;
        }

        const otherPlayer = state[other[key]];
        if (
          otherPlayer.selected === ACTION_SHOOT &&
          (player.selected !== ACTION_BLOCK ||
            Number(otherPlayer.ammo) === MAX_AMMO)
        ) {
          player.health = Math.max(0, Number(player.health) - 1);
          if (!player.health) {
            gameOver = true;
          }
        }

        return key;
      })
      .forEach(key => {
        const player = state[key];
        player.action = player.selected;
        player.selected = defaultPlayerState.selected;
      });

    if (gameOver) {
      clearInterval(heartbeat);
    } else {
      state.round = nextRound;
    }

    await hmsetAsync(game.id, flatten(state));
    dispatch(state, {
      status: gameOver ? 'Completed' : 'Playing',
      nextTick: gameOver ? null : nextTick,
      lastTick: now,
    });
  }, TICK_DURATION);

  const now = Date.now();
  dispatch(game, {
    status: 'Connected',
    maxRounds: MAX_ROUNDS,
    maxAmmo: MAX_AMMO,
    maxHealth: MAX_HEALTH,
    lastTick: now,
    nextTick: now + TICK_DURATION,
  });

  // Clear the heartbeat when this socket disconnects
  socket.on('disconnect', () => clearInterval(heartbeat));
});

server.listen(process.env.PORT, () =>
  console.log(`listening on port ${process.env.PORT}`)
);
