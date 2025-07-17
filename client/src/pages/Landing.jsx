import React from 'react';
import {Link} from 'react-router-dom';

const Landing = () => (
    <div className="flex flex-col items-center justify-center h-[90vh] text-centerbg-gradient-to-br from-blue-100 to-purple-200">
        <h1 className="text-4xl md:text-6xl font-bold text-blue-800 mb-4">Welcome to SkillBridge</h1>
        <p className="text-gray-700 max-w-xl">Real-time mentorship. Video + Code +Chat. Collaborateand grow with mentors & learners globally.</p>
        <div className="space-x-4">
            <Link to="/login" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            Login
            </Link>
            <Link to="/register" className="text-blue-700 underline">Register</Link>

        </div>
    </div>
);

export default Landing;