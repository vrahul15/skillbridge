import {Link} from 'react-router-dom';
import {useContext} from 'react';
import {AuthContext} from '../context/AuthContext';

const Navabr = () => {
    const {user, logout} =useContext(AuthContext);

    return (
        <nav className="bg-white shadow sticky top-0 z-50 px-6 py-3 flex justify-between items-center ">
            <Link to="/" className="text-xl font-bold text-blue-700">AkillBRidge</Link>
            <div className="flex gap-4 items-center">
                {user? (
                    <>
                    <span className="text-gray-700">Hi,{user.name}</span>
                    <Link to="/dashboard" className="text-blue-600 hover:underline">Dashboard</Link>
                    <button onClick={logout} className="text-red-500 hover:underline">Logout</button>
                    </>
                ):(
                    <>
                    <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
                    <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};


export default Navbar;