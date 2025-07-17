import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const Login =()=> {
    const [form, setForm] = useState({email: '', password: ''});
    const navigate = useNavigate();

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
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md space-y-4">
                <h2 className="text-3xl font-semibold text-center text-blue-700">Login</h2>
                <input
                   type="email"
                   name="email"
                   placeholder="Email"
                   value={from.email}
                   onChange={handleChange}
                   className="w-full border rounded px3 py-2 focus:outine-none focus:ring-2 focus:ring-blue-400 "
                   required/>
                   <input
                   type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    classname="w-full border rounded px3 py-2 focus:outine-none focus:ring-2 focus:ring-blue-400"
                    required/>
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                        Login
                    </button> 
                    <p className="text-sm text-center">
                        Dont't Have an Account?{" "}
                        <a href="/register" className="text-blue-600 underline">Register</a>
                    </p>
            </form>
        </div>
    );
};

export default Login;
