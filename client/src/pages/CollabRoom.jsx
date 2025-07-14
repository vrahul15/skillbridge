import React, { useEffect, useRef, useState } from "react";
import socket from "../sockets/SocketClient";
import peer from "../peers/PeerClient";
import { useParams } from "react-router-dom";
import { MonacoEditor } from "@monaco-editor/react";

const CollabRoom = () => {
  const { roomId } = useParams();
  const localVideo = useRef();
  const remoteVideo = useRef();
  const [chat, setChat] = useState([]);
  const [msg, setMsg] = useState("");
  const [code, setCode] = useState("// Start coding...");
  const [peerId, setPeerId] = useState("");

  // Join room + setup socket & peer
  useEffect(() => {
    socket.emit("join_room", roomId);

    peer.on("open", (id) => {
      setPeerId(id);
      socket.emit("peer_id", { roomId, peerId: id });
    });

    peer.on("call", (call) => {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
        localVideo.current.srcObject = stream;
        call.answer(stream);
        call.on("stream", (remoteStream) => {
          remoteVideo.current.srcObject = remoteStream;
        });
      });
    });

    socket.on("peer_id", ({ peerId: remoteId }) => {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
        localVideo.current.srcObject = stream;
        const call = peer.call(remoteId, stream);
        call.on("stream", (remoteStream) => {
          remoteVideo.current.srcObject = remoteStream;
        });
      });
    });

    socket.on("receive_message", (msg) => setChat((prev) => [...prev, msg]));
    socket.on("code_sync", (newCode) => setCode(newCode));

    return () => {
      socket.off("receive_message");
      socket.off("code_sync");
      socket.off("peer_id");
    };
  }, [roomId]);

  const sendMessage = () => {
    const message = { sender: peerId, text: msg, timestamp: new Date() };
    socket.emit("send_message", { roomId, ...message });
    setChat((prev) => [...prev, message]);
    setMsg("");
  };

  const handleCodeChange = (val) => {
    setCode(val);
    socket.emit("code_change", { roomId, code: val });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 h-screen">
      {/* Left Column: Video + Chat */}
      <div className="space-y-4">
        <div className="flex gap-2">
          <video ref={localVideo} autoPlay muted className="w-1/2 border rounded" />
          <video ref={remoteVideo} autoPlay className="w-1/2 border rounded" />
        </div>

        <div className="bg-white h-60 overflow-y-auto border p-2 rounded shadow">
          {chat.map((msg, i) => (
            <div key={i}>
              <b>{msg.sender === peerId ? "You" : "Peer"}:</b> {msg.text}
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            className="flex-1 border p-2 rounded"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Send a message..."
          />
          <button onClick={sendMessage} className="bg-blue-600 text-white px-4 rounded">
            Send
          </button>
        </div>
      </div>

      {/* Right Column: Code Editor */}
      <div>
        <MonacoEditor
          height="100%"
          defaultLanguage="javascript"
          theme="vs-dark"
          value={code}
          onChange={handleCodeChange}
        />
      </div>
    </div>
  );
};

export default CollabRoom;
