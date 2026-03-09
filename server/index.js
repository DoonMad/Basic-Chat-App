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


const rooms = new Set();

const generateRoomId = () => {
    let roomId = Math.random().toString(36).substring(2, 8);;
    while(rooms.has(roomId)) {
        roomId = Math.random().toString(36).substring(2, 8);
    }
    rooms.add(roomId);
    return roomId;
}


// Routes?
app.get('/', (req, res) => {
    res.send("Hello World !!!");
});

app.post('/api/rooms', (req, res) => {
    const roomId = generateRoomId();
    res.json({id: roomId});
})

app.get('/api/rooms/:id', (req, res) => {
    console.log(req.params)
    res.send("created");
})


httpServer.listen(3000, () => {
  console.log("Server running on port 3000")
})