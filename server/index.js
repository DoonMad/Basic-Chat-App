import express from "express"
import { Server } from "socket.io";
import http from "http"
import cors from "cors"

const app = express()
const httpServer = http.createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173"
  }
})


// Middlewares
app.use(cors({
  origin: "http://localhost:5173"
}))


var rooms = new Set();

const generateRoomId = () => {
    let roomId = Math.random().toString(36).substring(2, 8);;
    while(rooms.has(roomId)) {
        roomId = Math.random().toString(36).substring(2, 8);
    }
    rooms.add(roomId);
    return roomId;
}

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join_room", roomId => {
    if(!roomId || !rooms.has(roomId)) {
      socket.emit("error", "Room does not exist");
      return;
    }
    socket.join(roomId);
    socket.emit("user_joined", socket.id);
  })
  
  socket.on("send_message", ({roomId, message}) => {
    // console.log(roomId, message)b
    if(!message?.text?.trim()) {
      console.log("invlid msg");
      return;
    }
    if(!roomId || !rooms.has(roomId)) {
      console.log("invalid room");
      return;
    }
    // console.log("message received on server");
    socket.to(roomId).emit("receive_message", message)
  })
})


// Routes?
app.get('/', (req, res) => {
    res.send("Hello World !!!");
});

app.post('/api/rooms', (req, res) => {
    // console.log("got here");
    const roomId = generateRoomId();
    // console.log("got here21");
    res.json({id: roomId});
    // console.log("got here22");
})

app.get('/api/rooms/:id', (req, res) => {
  const { id } = req.params;

  if (!rooms.has(id)) {
    return res.status(404).json({ exists: false });
  }

  res.json({ exists: true });
})


httpServer.listen(3000, () => {
  console.log("Server running on port 3000")
})