import React, {useContext} from "react";
import { AuthContext} from "../context/AuthContext";
import {Navigate} from "react-router-dom";

const Dashboard = () => {
    const { user, logout} = useContext(AuthContext);

    if(!user) return <Navigate to="/login" />;
   
    return (
        <div className="p-8">
            <h1 clasName="text-2xl font-bold mb-4">Welcome, {user.name}</h1>
            <p>Your role: <strong>{user.role}</strong></p>
            <button
                onClick={logout}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
                >
                    Logout
                </button>
        </div>
    );

};

export default Dashboard;
