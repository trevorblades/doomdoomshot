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
const spopAsync = promisify(client.spop).bind(client);
const saddAsync = promisify(client.sadd).bind(client);
const hsetAsync = promisify(client.hset).bind(client);
const hmsetAsync = promisify(client.hmset).bind(client);
const hgetallAsync = promisify(client.hgetall).bind(client);

function sendGame(game) {
  websocket.to(game.id).send(game);
}

function setupGame(game, socket) {
  socket.join(game.id);
  sendGame(game);

  socket.on('message', async message => {
    await hsetAsync(game.id, socket.id, message);
    const reply = await hgetallAsync(game.id);
    sendGame(reply);
  });
}

const QUEUE_KEY = 'queue';
websocket.on('connection', async socket => {
  // Grab a random opponent and remove them from the queue
  const opponent = await spopAsync(QUEUE_KEY);
  if (!opponent) {
    // If there aren't any opponents, add the current user to the queue
    await saddAsync(QUEUE_KEY, socket.id);

    // Subscribe to changes to queued status
    const sub = client.duplicate();
    sub.subscribe(socket.id);
    sub.on('message', async (channel, id) => {
      sub.unsubscribe();
      sub.quit();

      const game = await hgetallAsync(id);
      setupGame(game, socket);
    });

    socket.on('disconnect', () => {
      client.srem(QUEUE_KEY, socket.id);
      sub.unsubscribe();
      sub.quit();
    });
    return;
  }

  const game = {
    id: shortid.generate(),
    player1: opponent,
    player2: socket.id,
    [socket.id]: '🙅',
    [opponent]: '🙅‍',
  };

  await hmsetAsync(game.id, game);

  // Let the queued opponent know that a game has been found
  client.publish(opponent, game.id);
  setupGame(game, socket);
});

server.listen(process.env.PORT, () =>
  console.log(`listening on port ${process.env.PORT}`)
);
