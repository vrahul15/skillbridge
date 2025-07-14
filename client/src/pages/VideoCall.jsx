import React, {useEffect, useState, useRef} from 'react';
import peer from '../peers/PeerClient';

const VideoCall = () => {
    const localVideo = useRef();
    const remoteVideo = useRef();
    const [peerId, setPeerId] = useState('');
    const [myPeerId, setMyPeerId] = useState('');

    useEffect(()=> {
        peer.on('open', (id)=> {
            setMyPeerId(id);      
          });

      peer.on('call', (call) => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
            localVideo.current.srcObject = stream;
            call.answer(stream);
            call.on('stream', (remoeStream) => {
                remoteVideo.current.srcObject = remoteStream;
            });
        });
      });    
    }, []);

    const callPeer = () => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }). then((stream) => {
            localVideo.current.srcObject = stream;
            const call = peer.call(peerId, stream);
            call.on('stream', (remoteStream) => {
                remoteVideo.current.srcObject = remoteStream;
            });
        });
    };

    return (
        <div className="p-4 space-y-4">
            <h2 className="text-xl font-bold">Peer-to-Peer Video Call</h2>
            <p className= "bg-gray-100 p-2 rounded">Your Peer ID: <strong>{myPeerId}</strong></p>
            <input
                type="text"
                value={peerId}
                onChange={(e) => setPeerId(e.target.value)}
                className="border p-2 rounded w-full"
                placeholder="Enter peer ID to call"
                />
                <button
                onClick={callPeer}
                className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
                >
                    Call
                </button>
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <video ref={localVideo} autoplay muted className="w-full border rounded" />
                    <video ref={remoteVideo} autoplay className="w-full border rounded" />
                </div>
        </div>
    );
};

export default VideoCall;
