const socketHandler = (io,socket) => {
    //join a private room
    socket.on('join_room', (roomID) => {
        socket.join(roomID);
        console.log(`User ${socket.id} joined room: ${roomID}`);
    });

    //Handle chat message
    socket.on('send_message', ({roomID,sender, text})=>{
        const message = {sender, text, timestamp: new Date() };
        io.to(roomID).emit('recieve_message', message);
    });

    socket.on('disconnect', () => {
        console.log(' User disconnected:', socket.id);
    });

    socket.on("code_change", ({roomId, code}) => {
    socket.to(roomId).emit("code_sync",code);
});

    socket.on("peer_id", ({ roomId, peerId }) => {
        socket.to(roomId).emit("peer-id", {peerId});
    });
};


export default socketHandler;