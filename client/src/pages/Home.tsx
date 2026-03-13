import { useNavigate } from "react-router-dom"
import { useState } from "react";

function Home() {
  const navigate = useNavigate();

  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");

  const saveUsername = () => {
    if (!username.trim()) {
      alert("Please enter a username");
      return false;
    }

    sessionStorage.setItem("username", username.trim());
    return true;
  };

  const joinRoom = async () => {
    if (!saveUsername()) return;
    if (!roomId) return;

    const res = await fetch(`http://localhost:3000/api/rooms/${roomId}`);

    if (res.status === 404) {
      alert("Room does not exist");
      return;
    }

    navigate(`/chat/${roomId}`);
  };

  const createRoom = async () => {
    if (!saveUsername()) return;

    const res = await fetch("http://localhost:3000/api/rooms", {
      method: "POST"
    });

    const data = await res.json();

    if (!data || !data.id) {
      console.log("Error creating room");
      return;
    }

    navigate(`/chat/${data.id}`);
  };

  return (
    <div className="bg-linear-to-br from-green-400 to-fuchsia-500 text-white min-h-screen flex justify-center items-center flex-col">

      <h1 className="text-6xl font-bold text-green-300">Basic Chat App</h1>

      <div className="flex flex-col items-center m-6">

        <input
          type="text"
          placeholder="Enter your username"
          className="p-3 m-2 border rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <button
          className="p-3 m-2 bg-green-700 rounded text-white cursor-pointer"
          onClick={createRoom}
        >
          Create Room
        </button>

        <p className="m-3 text-2xl">OR</p>

        <div>
          <input
            type="text"
            className="p-3 m-2 border rounded"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            placeholder="Enter Room Code"
            onKeyDown={(e) => {
              if (e.key === "Enter") joinRoom();
            }}
          />

          <button
            className="p-3 m-2 bg-green-700 rounded text-white cursor-pointer"
            onClick={joinRoom}
          >
            Join Room
          </button>
        </div>

      </div>
    </div>
  );
}

export default Home;