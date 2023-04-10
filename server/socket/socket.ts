import { Server } from "socket.io";
import { Server as HttpServer } from "http";

export default function initializeSocketIO(server: HttpServer) {
  const io = new Server(server);

  io.on("connection", (socket) => {
    console.log("New user connected");

    socket.on("join_room", (roomId) => {
      socket.join(roomId);
      console.log(`User joined room ${roomId}`);
    });

    socket.on("leave", (roomId) => {
      socket.leave(roomId);
      console.log(`User left room ${roomId}`);
    });

    socket.on("send_message", (roomId, message) => {
      socket.to(roomId).emit("rec_message", message);
      console.log(`Message sent to room ${roomId}: ${message}`);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
}
