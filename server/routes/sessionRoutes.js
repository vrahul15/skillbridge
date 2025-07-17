import express from 'express';
import Session from '../models/Session.js';
const router = ecpress.Router();

router.post('/add', async (req,res) => {
    try {
        const session = await Session.create({mentorId, timeSlot});
        res.json(session);
    } catch(err){
        res.status(400).json({error: err.message});
    }
});


router.post('/book/:id', async (req,res) => {
    const { learnerId} = req.body;
    try{
        const session = await Session.findById(req.params.id);
        if(!session || session.booked) return res.status(400).json({ error: 'Slot unavailable'});

        session.learnerId = learnerId;
        session.booked= true;
        await session.save();
        res.json(session);
    } catch(err){
        res.status(400).json({error:err.message});
    }
});

router.get('/mentor/:id', async (req,res)=> {
    try{
    const slots = await Session.find({mentorId: req.params.id});
    res.json(slots);
    } catch (err){
        res.status(400).json({error: err.message});
    }
});

router.get('/user/:id', async (req,res) => {
    try{
        const sessions = await  Session.fin({
            $or: [{ learnerId: req.params.id}, {mentorId: req.params.id}],
        }).populate('mentorId learnerId').sort({timeSlot: 1});
        res.json(sessions);
    } catch (err){
        res.status(400).json({ error: err.message });
    }
});

export default router;
