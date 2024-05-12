// npm packages
import "dotenv/config.js";
import express from 'express';
import http from 'http';
import logger from "morgan";
import cors from "cors";
import formData from "express-form-data";
import { setupSocketServer } from './socket-setup.js'; // Import the setupSocketServer function

// connect to MongoDB with mongoose
import "./config/database.js";

// import routes
import { router as profileRouter } from "./routes/profile.js";
import { router as authRouter } from "./routes/auth.js";
import { router as playerRouter } from "./routes/player.js";
import { router as matchRouter } from "./routes/match.js";
import { router as teamRouter } from "./routes/team.js";
import { router as sessionRouter } from "./routes/session.js";
import { router as tableRouter } from "./routes/table.js";

// create the express app
const app = express();
const { server, io } = setupSocketServer(app);

// basic middleware
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(formData.parse());

// mount imported routes
app.use("/api/profile", profileRouter);
app.use("/api/auth", authRouter);
app.use("/api/player", playerRouter);
app.use("/api/match", matchRouter);
app.use("/api/team", teamRouter);
app.use("/api/session", sessionRouter);
app.use("/api/table", tableRouter);

// handle 404 errors
app.use(function (err, req, res, next) {
  res.status(404).json({ err: err.message });
});

// handle all other errors
app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({ err: err.message });
});

// Socket.IO setup
io.on('connection', (socket) => {
  console.log('A user connected');
  // Handle socket events here
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});

export { app };
