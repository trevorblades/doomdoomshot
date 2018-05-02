const http = require('http');
const {promisify} = require('util');
const express = require('express');
const io = require('socket.io');
const redis = require('redis');
const shortid = require('shortid');

// TODO: color the console output--make it nice
const app = express();
const server = http.createServer(app);
server.listen(process.env.PORT, () =>
  console.log(`listening on port ${process.env.PORT}`)
);

const client = redis.createClient();
const spopAsync = promisify(client.spop).bind(client);
const saddAsync = promisify(client.sadd).bind(client);
const hmsetAsync = promisify(client.hmset).bind(client);
const hgetallAsync = promisify(client.hgetall).bind(client);

const websocket = io(server);
websocket.on('connection', async socket => {
  // Grab a random opponent and remove them from the queue
  const opponent = await spopAsync('queue');
  if (!opponent) {
    // If there aren't any opponents, add the current user to the queue
    await saddAsync('queue', socket.id);
    return;
  }

  const gameId = shortid.generate();
  await hmsetAsync(gameId, {
    count: 3,
    player1: socket.id,
    player2: opponent,
    selection1: '🙅',
    selection2: '🙅‍',
  });

  const game = await hgetallAsync(gameId);
  socket.send(game);
  socket.on('message', message => {
    console.log(`client says ${message}`);
  });
});
