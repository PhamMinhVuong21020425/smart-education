#!/usr/bin/env node

/**
 * Module dependencies.
 */

import app from '../index';
import debugLogger from 'debug';
import http from 'http';
import { Server, Socket } from 'socket.io';

const debug = debugLogger('smart-education:server');

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

// socket.io

io.on('connection', (socket: Socket) => {
  // When someone attempts to join the room
  socket.on('join-room', (roomId: string, userId: string) => {
    socket.join(roomId); // Join the room

    // Tell everyone else in the room that we joined
    socket.to(roomId).emit('user-connected', userId);

    // Communicate the disconnection
    socket.on('disconnect', () => {
      socket.to(roomId).emit('user-disconnected', userId);
    });

    socket.on('screen-share-started', (roomId: string, userId: string) => {
      // Broadcast to other users in the room
      socket.to(roomId).emit('user-screen-sharing', userId);
    });

    socket.on('screen-share-ended', (roomId: string, userId: string) => {
      // Notify other users screen share has ended
      socket.to(roomId).emit('user-screen-share-ended', userId);
    });
  });
});

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port, () => {
  console.log(
    `\x1b[33m> Server is running on \x1b[34mhttp://localhost:${port}\x1b[0m`
  );
});
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: string) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: NodeJS.ErrnoException) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr!.port;
  debug('Listening on ' + bind);
}
