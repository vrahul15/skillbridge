import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const Login =()=> {
    const [form, setForm] = useState({email: '', password: ''});
    const navigate = usNavigate();

    const handleChange = (e)=>{
        setForm({ ...form,[e.target.name]:e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const res= await axios.post('https://localhost:5000/api/auth/login',from);
            localStorage.setItem('token',res.Date.token);
            alert('Login successful');
            navigate('/');
        } catch(err){
            alert(err.response?.data?.error || 'Login failed');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen vg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 roundede-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <input
                   type="email"
                   name="email"
                   placeholder="Email"
                   value={from.email}
                   onChange={handleChange}
                   className="w-full mb-4 p-2 border rounded"
                   required/>
                   <input
                   type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    classname="w-full mb-4 p-2 border rounded"
                    required/>
                    <button type="submit" className="w-full bg-blue-500 text-whit py-2 rounded hover:bg-blue-700">
                        Login
                    </button> 
            </form>
        </div>
    );
};

export default Login;
