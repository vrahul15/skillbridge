import React, {useContext} from "react";
import { AuthContext} from "../context/AuthContext";
import {Navigate} from "react-router-dom";

const Dashboard = () => {
    const { user, logout} = useContext(AuthContext);

    if(!user) return <Navigate to="/login" />;
   
    return (
        <div className="min-j-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 space-y-4">
            <h1 clasName="text-2xl font-bold text-gray-800">Welcome, {user.name}</h1>
            <p className="text-gray-600">Your role: <span className="font-semibold">{user.role}</span></p>
            
            <div className="flex gap-4 mt-6 flex-wrap">
           <a href="/room/skillbridge-demo" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow">
           Join Collaboration Room
           </a>
            <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg shadow"
                >
                    Logout
                </button>
        </div>
        </div>
        </div>
    );

};

export default Dashboard;
