import express from 'express';
import { register, login } from '../controllers/authController.js';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

router.get('/me', async (req,res) => {
     try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Token missing" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (err) {
    console.error('🔴 /me error:', err);
    res.status(401).json({ error: "Invalid or expired token" });
  }
});



router.post('/register', register);
router.post('/login', login);

export default router;
