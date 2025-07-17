import mongoose from 'mongoose';

const sessionsSchema =new mongoose.Schema({
    mentorId: { type: mongoose.Schema.Types.ObjectId,ref: 'User', required: true },
    learnerId: {type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    timeSlot: {type: Date, required:true},
    booked: {type: Boolean, default: false}
});

export default mongoose.model('Session',sessionSchema);
