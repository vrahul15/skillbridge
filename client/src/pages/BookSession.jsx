import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';

const BookSession = ({learnerId}) => {
    const { mentorId } = useParams();
    const [slots, setSlots] = useState([]);

    useEffect(() => {
        const fetchSlots =async () => {
            try {
                const res= await axios.get(`https://localhost:5000/api/sessions/mentor/${mentorId}`);
                setSlots(res.data);
            } catch(error) {
                console.error("Error fetching slots:",error);
            }
        };
        fetchSlots();
    },[mentorId]);

    const book = async(id) => {
        try{
            await axios.post(`https://localhost:5000/api/sessions/book/${id}`,{learnerId});
            alert("Slot booked successfully");
            setSlots((prev) => 
            prev.map((slot) =>
            slot._id === id ? { ...slot, booked: true, learnerId} : slot
        )
    );
        } catch (error){
            alert("Failed to book slot.");
            console.error(error);
        }
    };

    return (
        <div clasName="p-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-blue-700">Available Slots</h2>
            <ul className="space-y-3">
                {slots.lenght === 0 ? (
                    <p className="text-gray-500">No slots available.</p>
                ):(
                    slots.map((slot) => (
                        <li
                        key={slot._id}
                        className="flex items-center justify-between p-4 bg-white rounded shadow border"
                        >
                            <span>{new Date(slot.timeSlot).toLocaleString()}</span>
                            {slot.booked ? (
                                <span className="text-green-600 font-semibold">Booked</span>
                            ):(
                                <button
                                   onClick={() => book(slot._id)}
                                   className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                                   >
                                   Book
                                   </button> 

                                
                            )}
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};


export default BookSession;