const http = require('http');
const express = require('express');
const io = require('socket.io');

const app = express();
const server = http.createServer(app);
server.listen(process.env.PORT, () =>
  console.log(`listening on port ${process.env.PORT}`)
);

const websocket = io(server);
websocket.on('connection', socket =>
  console.log(`a client just joined on ${socket.id}`)
);
