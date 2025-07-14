
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

//connect DB & start server
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
    server.listen(PORT, () => console.log(`server running on port ${PORT}`));
});

app.use(cors({
    origin: 'https://skillbridge.vercel.app', // frontend URL
    credentials: true
}))
