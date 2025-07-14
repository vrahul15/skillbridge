import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import socketHandler from './sockets/socketHandler.js';

import authroutes from './routes/authRoutes.js';
import connectDB from './config/db.js';

dotenv.config();
const app = express();

// Log current environment values
console.log("MONGO_URI =", process.env.MONGO_URI);
console.log("JWT_SECRET =", process.env.JWT_SECRET);

// Check required environment variables
if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
  console.error('❌ Missing required environment variables!');
  process.exit(1);
}

// Middleware
app.use(cors({
  origin: 'https://skillbridge.vercel.app', // frontend URL
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authroutes);

// Create HTTP Server
const server = http.createServer(app);

// Setup Socket.IO
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log('🟢 User connected:', socket.id);
  socketHandler(io, socket);
});

// DB Connection + Server Startup
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    server.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  });

// Global Error Catchers
process.on("unhandledRejection", (reason, promise) => {
  console.error("❌ Unhandled Promise Rejection:", reason);
});

process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err);
});
