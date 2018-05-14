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
const keysAsync = promisify(client.keys).bind(client);
const hmsetAsync = promisify(client.hmset).bind(client);
const hgetallAsync = promisify(client.hgetall).bind(client);

async function createGame(socket) {
  const gameId = shortid.generate();
  await hmsetAsync(gameId, {
    id: gameId,
    player1: socket.id,
    player2: '',
  });

  socket.join(gameId);
}

const websocket = io(server);
websocket.on('connection', async socket => {
  const keys = await keysAsync('*');
  const games = await Promise.all(keys.map(key => hgetallAsync(key)));
  const game = games.find(game => !game.player2);
  if (game) {
    socket.join(game.id);
    console.log(game);
  } else {
    createGame(socket);
  }

  socket.on('disconnect', () => {
    // Forfeit and clean up game stuff
    console.log('user disconnected');
  });
});

// const spopAsync = promisify(client.spop).bind(client);
// const saddAsync = promisify(client.sadd).bind(client);
// const hsetAsync = promisify(client.hset).bind(client);
// const hmsetAsync = promisify(client.hmset).bind(client);
// const hgetallAsync = promisify(client.hgetall).bind(client);
//
// function setupGame(game, socket) {
//   socket.send(game);
//   socket.on('message', async message => {
//     await hsetAsync(game.id, socket.id, message);
//     const nextGame = await hgetallAsync(game.id);
//     socket
//       .send(nextGame)
//       .to(game.player1)
//       .to(game.player2)
//       .send(nextGame);
//   });
// }
//
// const QUEUE_KEY = 'queue';
// const websocket = io(server);
// websocket.on('connection', async socket => {
//   // Grab a random opponent and remove them from the queue
//   const opponent = await spopAsync(QUEUE_KEY);
//   if (!opponent) {
//     // If there aren't any opponents, add the current user to the queue
//     await saddAsync(QUEUE_KEY, socket.id);
//
//     const subscriber = client.duplicate();
//     subscriber.subscribe(socket.id);
//     subscriber.on('message', async (channel, gameId) => {
//       subscriber.quit();
//
//       const game = await hgetallAsync(gameId);
//       setupGame(game, socket);
//     });
//
//     socket.on('disconnect', () => {
//       subscriber.quit();
//       client.srem(QUEUE_KEY, socket.id);
//     });
//     return;
//   }
//
//   const game = {
//     id: shortid.generate(),
//     player1: opponent,
//     player2: socket.id,
//     [socket.id]: '🙅',
//     [opponent]: '🙅‍',
//   };
//
//   await hmsetAsync(game.id, game);
//   client.publish(opponent, game.id);
//   setupGame(game, socket);
// });
