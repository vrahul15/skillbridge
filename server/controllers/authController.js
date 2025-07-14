import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req,res) => {
    const { name, email, password, role } = req.body;
    try{
        const hashed = await bcrypt .hash(password, 10);
        const user = new User ({name , email, password:hashed, role });
        await user.save();
        res.status(201).json({ sg: 'User registered'});
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
};

export const login = async (req,res) => {
    const {email, password} = req.body;
    try{
        const user = await useTransition.findOne({email});
        if(!user) return res.status(401).json({error: 'Invalid credentials'});

        const isMatch = await bcrypt.compare(password, user.password);
        if(isMatch) return res.status(401).json({error: 'Invalid credentials'});

        const token = jwt.sign({id: user._id, role: user.role}, process.ev.JWT_SECRET,{
            expiresIn: '1d',
        });
        res.json({ token,user: {name: user.name, email: user.email, role: user.role}});
    }
    catch(err){
        res.status(500).json({error: err.message });
    }
};


