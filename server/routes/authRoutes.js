import express from 'express';
import { register, login } from '../controllers/authController.js';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

router.get('/me', async (req,res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user  =await User.findById(decoded.id).select('-password');
        res.json(user);
    } catch (err){
        res.status(401).json({error: "Invalid token"});
    }
});

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

export default router;
