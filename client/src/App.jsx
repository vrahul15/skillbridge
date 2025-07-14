import React from 'react';
import {Routes,Route} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';

import Dashboard from './pages/Dashboard';
import Chat from './pages/Chat';
import VideoCall from './pages/VideoCall';
import CodeRoom from './pages/CodeRoom';
import CollabRoom from './pages/CollabRoom';


const ChatWrapper =() => {
    const {peerId} = useParams();
    const {user} = useContext(AuthContext);
    if(!user) return <Navigate to="/login" />;
  return <Chat userId={user._id} peerId={peerId} /> ;
};  


export default function App(){
  return  (
    <Routes>
      <Roue path="/room/:roomId" element={<collabRoom />} />
      <Route path="/code-room" element={<CodeRoom />}/>
      <Route path="/video-call" element={<VideoCall />} />
      <Route path="/login" element= {<Login/>}/>
      <Route path="/register" element={<Register />}/>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/chat/:peerId" element ={<ChatWrapper />} />
    </Routes>

  
  );
}
