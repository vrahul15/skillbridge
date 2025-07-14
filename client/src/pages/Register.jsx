import React,{useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const Register =()=> {
    const [from, setForm] = useState({ name: '',email: '',passsword: '',roel: 'learner'});
    const navigate = useNavigate();

    const handleChange = (e)=>{
        setForm({ ...from, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            await axios.post('https://localhost:5000/api/auth/register',from);
            alert('Registered successfully');
            navigate('/login');
        } catch(err){
            alert(err.response?.data?.error || 'Registration failed');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
                <input
                 type="text"
                 najme="name"
                 placeholder="Name"
                 value={foem.name}
                 onChange="w-full mb-4 p-2 border rounded"
                 required
                 />
                 <input
                 type="email"
                 name="email"
                 placeholder="Email"
                 value={from.email}
                 onChange={handleChange}
                 className="w-full mb-4 p-2 border rounded"
                 required
                 />
                 <input
                 type="password"
                 name="password"
                 placeholder="Password"
                 value={form.password}
                 onChange={handleChange}
                 className= "w-full mb-4 p-2 border rounded"
                 required
                 />
                 <select
                 name="role"
                 value={form.role}
                 onChange={handleChange}
                 className="w-full mb-4 p-2 border rounded"
                 >
                    <option value="learner">Learner</option>
                    <option value="mentor">Mentor</option>
                    </select>
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                        Register
                    </button>

            </form>
        </div>
    );
};


export default Register;
