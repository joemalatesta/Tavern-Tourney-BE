import http from 'http'
import { Server as SocketServer } from 'socket.io';
import { app } from './server.js'; // Import the app from server.js

export function setupSocketServer(app) {
  const server = http.createServer(app);
  const io = new SocketServer(server);
  return { server, io };
}
