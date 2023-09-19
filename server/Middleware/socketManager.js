const { Server } = require("socket.io");

// Create an empty array to store the room names
const rooms = [];

function initializeSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000", // Replace with your front-end URL
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected", socket.id);

    socket.on("join_room", (data) => {
      socket.join(data);
      if (!rooms.includes(data)) {
        rooms.push(data);

        // Send the updated room list to all connected clients
        io.emit("room_list", rooms);
        // console.log(rooms);
      }
      console.log(`User with ID: ${socket.id} joined room ${data}`);
    });

    socket.on("send_message", (data) => {
      console.log(data);
      socket.to(data.room).emit("receive_message", data);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected!", socket.id);
    });
  });
}

module.exports = initializeSocket;
