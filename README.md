# Basic Chat App

A simple real-time chat application built with **React, Node.js, Express, and Socket.IO**.  
Users can create temporary chat rooms or join existing ones using a room ID and send messages in real time.

This project was built to learn **real-time communication, backend APIs, and WebSocket-based systems**.

---

# Features

- Create chat rooms with a generated room ID
- Join existing rooms using a room code
- Real-time messaging using WebSockets
- Multiple users in a room
- Messages displayed instantly without refreshing
- Simple and responsive UI

---

# Tech Stack

## Frontend
- React
- React Router
- Tailwind CSS
- TypeScript

## Backend
- Node.js
- Express
- Socket.IO

---


# How It Works

1. A user creates a room from the homepage.
2. The server generates a unique room ID.
3. Users join the room using the room ID.
4. When a user sends a message all users in the room receive the message instantly.

Event flow:

```
Client → send_message → Server
Server → receive_message → Clients in room
```

---


# Learning Goals

This project focuses on learning:

- WebSocket-based communication
- Real-time application architecture
- Client-server event systems
- React state management with live data
- Backend API design

---

# License

This project is for learning purposes and experimentation.