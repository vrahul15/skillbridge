import React, {useState} from 'react';
import axios from 'axios';

const MentorSchedule = ({mentorId}) => {
    const [dateTime, setDateTime] = useState('');
    const [slots, setSlots] = useState([]);

    const addSlot = async () => {
        if(!dateTime) return alert("Please select a date& time");

        try{
            const res= await axios.post('https://localhost:5000/api/sessions/add', {
                mentorId,
                timeSlot: dateTime,
            });
            setSlots((prev) => [...prev,res,data]);
            setDateTime('');
            alert(' Slot added!');
        } catch (error){
            console.error("Error adding slot:", error);
            alert("Failed to add slot.");
        }
    };

    useEffect(() => {
        const fetchSlots =async () => {
            try{
                const res=await axios.get(`https://localhost:5000/api/sessions/mentor/${mentorId}`);
                setSlots(res.data);
            } catch(error) {
                console.error("Error fetching slots:", error);
            }
        };

        fetchSlots();
    }, [mentorId]);

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-blue-700"> Mentor Schedule</h2>

            <div className="flex items-center gap-3 mb-6">
                <input 
                 type="datetime-local"
                 value={dateTime}
                 onChange={(e) => setDateTime(e.target.value)}
                 className="border p-2 rounded w-full"
                 />
                 <button 
                 onClick={addSlot}
                 className="bg-blue-600 text-white px-4 py-2 rounde hover:bg-blue-700">
                    Add Slot
                    </button>
                </div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Your Slot</h3>
                <ul className="space-y-3">
                    {slots.length === 0 ? (
                        <p className="text-gray-500">No slots added yet.</p>
                    ):(
                        slots.map((slot) => (
                            <li
                            key={slot._id}
                            className="bg-white shadow p-3 rounded flex justify-between items-center"
                            >
                                <span>{new Date(slot.timeSlot).toLocaleString()}</span>
                                {slot.booked ? (
                                    <span className="text-green-600 font-semibold ">Booked</span>
                                ):(
                                    <span className="text-gray-500">Available</span>
                                )}
                            </li>
                        ))
                    )}
                </ul>
        </div>
    );
};

export default MentorSchedule;