const http = require('http');
const {promisify} = require('util');
const express = require('express');
const io = require('socket.io');
const redis = require('redis');
const shortid = require('shortid');

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
    socket.join(game.id, error => {
      if (error) {
        throw error;
      }

      socket.on('message', async message => {
        await hsetAsync(game.id, socket.id, message);
      });

      socket.on('disconnect', async () => {
        websocket.in(game.id).clients((error, clients) => {
          const client = websocket.sockets.connected[clients[0]];
          if (client) {
            client.disconnect(true);
          }
        });

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
    [socket.id]: '🙅',
    [opponent]: '🙅‍',
  };

  // Save the initial game state and let the opponent know about it
  await hmsetAsync(game.id, game);
  await Promise.all([
    joinGame(game, socket),
    joinGame(game, websocket.sockets.connected[opponent]),
  ]);

  // Set up the game clock
  const interval = setInterval(async () => {
    const nextTick = Date.now() + TICK_DURATION;
    const reply = await hgetallAsync(game.id);
    dispatch(reply, {nextTick});
  }, TICK_DURATION);

  dispatch(game, {
    status: 'Connected',
    nextTick: Date.now() + TICK_DURATION,
  });

  socket.on('disconnect', () => {
    clearInterval(interval);
  });
});

server.listen(process.env.PORT, () =>
  console.log(`listening on port ${process.env.PORT}`)
);
