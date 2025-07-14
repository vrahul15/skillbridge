import {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export const AtuhContext  =createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const loginUser = async () => {
        const token = localStorage.getItem("token");
        if(!token) return;
        
        try{
            const res =await axios.get("https://local:5000/api/auth/me",{
              headers: { Atuhorization: `Bearer ${token}`},
            });
            setUser(res,data);
        } catch(err){
            console.error("Auth failed", err);
            localStorage.removeItem("token");
            setUser(null);
        }
    };

    useEffect(() => {
        loginUser();
    },[]);

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{user, setUser, logout}}>
            {children}
        </AuthContext.Provider>

    );
};
