import React, {useEffect, useRef, useState} from "react";
import Editor from "@monaco-editor/react";
import socket from "../sockets/SocketClient";

const CodeRoom = ({ roomId = "room-123"}) => {
    const editorRef = useRef(null);
    const [code, setCode] =useState("// start coding...//");

    //Join the code room
    useEffect(() => {
        socket.emit("join_room", roomId);

        //recieve code changes
        socket.on("code_sync", (newCode) => {
            setCode(newCode);
        });
        return () => socket.off("code_sync");

    }, [roomId]);

    const handleChange = (newValue) => {
        setCode(newValue);
        socket.emit("code_change", {roomId, code: newValue});
    };

    return (
        <div className="p-4 h-screen">
            <h2 className="text-xl font-bold mb-4">Live Code Editor</h2>
            <Editor
                height="90vh"
                defaultLanguage="javascript"
                theme="vs-dark"
                value={code}
                onChange={handleChange}
                options={{fontsize: 16}}
                />
        </div>
    );
};

export default CodeRoom;
