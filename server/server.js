const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const websocket = socketio(server);
server.listen(process.env.PORT, () =>
  console.log(`listening on port ${process.env.PORT}`)
);

websocket.on('connection', socket =>
  console.log(`a client just joined on ${socket.id}`)
);
