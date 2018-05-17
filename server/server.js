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

function startGame(game, socket) {
  socket.join(game.id);

  dispatch(game, {status: 'Connected'});
  socket.on('message', async message => {
    await hsetAsync(game.id, socket.id, message);
    const reply = await hgetallAsync(game.id);
    dispatch(reply);
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
}

const QUEUE_KEY = 'queue';
websocket.on('connection', async socket => {
  // A new connection was made! We need to try to match this player up with an
  // opponent. First, we grab a random opponent and remove them from the queue
  const opponent = await spopAsync(QUEUE_KEY);
  if (!opponent) {
    // If there aren't any opponents, add the current user to the queue
    await saddAsync(QUEUE_KEY, socket.id);

    // Subscribe to changes to queued status
    const sub = client.duplicate();
    sub.subscribe(socket.id);
    socket.send({status: 'Waiting for opponent...'});
    sub.on('message', async (channel, id) => {
      const game = await hgetallAsync(id);
      startGame(game, socket);
    });

    socket.on('disconnect', () => {
      // Clean things up after a queued user disconnects
      client.srem(QUEUE_KEY, socket.id);
      sub.unsubscribe();
      sub.quit();
    });
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
  client.publish(opponent, game.id);
  startGame(game, socket);
});

server.listen(process.env.PORT, () =>
  console.log(`listening on port ${process.env.PORT}`)
);
