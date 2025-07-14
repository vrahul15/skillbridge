
import express from 'express';
import http from 'http';
import {Server} from 'socket.io';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import socketHandler from './sockets/socketHandler.js';

import authroutes from './routes/authRoutes.js';
import connectDB from './config/db.js';

dotenv.config();
const app = express();

// Check for required environment variables
if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
  console.error('❌ Missing required environment variables!');
  console.log('MONGO_URI:', process.env.MONGO_URI);
  console.log('JWT_SECRET:', process.env.JWT_SECRET);
  process.exit(1); // Exit the app
}

//middlewares
app.use(cors());
app.use(express.json());

//routes
app.use('/api/auth',authroutes);

const server=http.createServer(app);
const io= new Server(server,{
    cors:{
        origin: '*',
        methods: ['GET','POST']
    }
});

//socket connection
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
    socketHandler(io, socket);
});

/// Start Server with DB Connection
const PORT = process.env.PORT || 5000;
connectDB()
  .then(() => {
    server.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('❌ DB connection failed:', err);
    process.exit(1);
  });

app.use(cors({
    origin: 'https://skillbridge.vercel.app', // frontend URL
    credentials: true
}))
