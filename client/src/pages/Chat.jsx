import React,{useEffect, useState} from 'react';
import socket from '../sockets/SocketClient';

const Chat = ({userId, peerId}) => {
    const [message, setMessage] = useState('');
    const [chat,setChat] = useState([]);
    const roomId = [userId, peerId].sort().join('-');

    useEffect(() => {
        socket.emit('join_room',roomId);

        socket.on('recieve_message', (msg) => {
            setChat((prev) => [...prev,msg]);
        });
        return () => socket.off('recieve_message');
    },[roomId]);

    const handleSend =() => {
        if (message.trim()) {
            const msgObj = {roomId, sender: userId, text: message};
            socket.emit('send_message',msgObj);
            setChat((prevv) => [...prev.msgObj]);
            setMessage('');
        }
    };

    return (
        <div className="p-4">
            <h2 className="font-bold text-xl mb-2">Chat Room</h2>
            <div className="border h-64 overflow-y-scroll p-2 bg-white mb-4 rounded shadow">
                {chat.map((msg,i) => (
                    <div key={i} className="mb-2">
                        <strong>{msg.sender === userId ? 'You' : 'Peer'}:</strong> {msg.text}
                    </div>
                ))}
            </div>
            <div className="flex gap-2">
                <input
                  className="felx-1 border rounded p-2"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message"
                  />
                  <button onClick={handleSend} className="bg-blue-600 text-white px-4 py-2 rounded">
                    Send
                  </button>
            </div>
        </div>
    );
};


export default Chat;