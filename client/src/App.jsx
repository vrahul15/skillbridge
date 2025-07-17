import React from 'react';
import {Routes,Route} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';

import Dashboard from './pages/Dashboard';
import Chat from './pages/Chat';
import VideoCall from './pages/VideoCall';
import CodeRoom from './pages/CodeRoom';
import CollabRoom from './pages/CollabRoom';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import MentorSchedule from './pages/MentorSchedule';
import BookSession from './pages/BookSession';
import {useContext} from 'react';
import {AuthContext} from './context/AuthContext';
import {Navigate} from 'react-router-dom';


const ChatWrapper =() => {
    const {peerId} = useParams();
    const {user} = useContext(AuthContext);
    if(!user) return <Navigate to="/login" />;
  return <Chat userId={user._id} peerId={peerId} /> ;
};  

const {user} =useContext(AuthContext);

export default function App(){
  return  (
    <>
    <Navbar />
    <Routes>
      <Route path="/room/:roomId" element={<CollabRoom />} />
      <Route path="/mentor/schedule" element={<MentorSchedule mentorId={user._id} />} />
      <Route path="/book/:mentorId" element={<BookSession learnerId={user._id} />} />
      <Route path="/code-room" element={<CodeRoom />}/>
      <Route path="/video-call" element={<VideoCall />} />
      <Route path="/login" element= {<Login/>}/>
      <Route path="/register" element={<Register />}/>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/" element={<Navigate to ="/login"/>} />
      <Route path="/chat/:peerId" element ={<ChatWrapper />} />
    </Routes>
  </>
  
  );
}
