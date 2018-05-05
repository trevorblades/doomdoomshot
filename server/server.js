const http = require('http');
const {promisify} = require('util');
const express = require('express');
const io = require('socket.io');
const redis = require('redis');
const shortid = require('shortid');

const app = express();
const server = http.createServer(app);
server.listen(process.env.PORT, () =>
  console.log(`listening on port ${process.env.PORT}`)
);

const client = redis.createClient();
const spopAsync = promisify(client.spop).bind(client);
const saddAsync = promisify(client.sadd).bind(client);
const hsetAsync = promisify(client.hset).bind(client);
const hmsetAsync = promisify(client.hmset).bind(client);
const hgetallAsync = promisify(client.hgetall).bind(client);

const websocket = io(server);
websocket.on('connection', async socket => {
  // Grab a random opponent and remove them from the queue
  const opponent = await spopAsync('queue');
  if (!opponent) {
    // If there aren't any opponents, add the current user to the queue
    await saddAsync('queue', socket.id);

    const subscriber = client.duplicate();
    subscriber.subscribe(socket.id);
    subscriber.on('message', async (channel, gameId) => {
      const game = await hgetallAsync(gameId);
      socket.send(game);
      socket.on('message', async message => {
        await hsetAsync(gameId, socket.id, message);
        const game = await hgetallAsync(gameId);
        socket.send(game);
      });
    });

    socket.on('disconnect', () => {
      subscriber.quit();
      client.srem('queue', socket.id);
    });
    return;
  }

  const gameId = shortid.generate();
  const game = {
    player1: opponent,
    player2: socket.id,
    [socket.id]: '🙅',
    [opponent]: '🙅‍',
  };

  await hmsetAsync(gameId, game);
  client.publish(opponent, gameId);
  socket.send(game);

  socket.on('message', async message => {
    await hsetAsync(gameId, socket.id, message);
    const game = await hgetallAsync(gameId);
    socket.send(game);
  });
});
