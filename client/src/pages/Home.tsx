import { useNavigate } from "react-router-dom"
import socket from "../socket/socket"
import { useState } from "react";

function Home() {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");

  const joinRoom = async () => {
    if (!roomId) return;

    const res = await fetch(`http://localhost:3000/api/rooms/${roomId}`);

    if (res.status === 404) {
      alert("Room does not exist");
      return;
    }

    navigate(`/chat/${roomId}`);
  }

  const createRoom = async () => {
    const res = await fetch("http://localhost:3000/api/rooms", {
      method: "POST"
    });

    console.log(socket)

    const data = await res.json();

    if(!data || !data.id) {
      console.log('error')
    }
    else {
      navigate(`/chat/${data.id}`)
    }
  }

  return (
    <>
      <div 
        className='bg-linear-to-br from-green-400 to-fuchsia-500 text-while min-h-screen flex justify-center items-center flex-col'
      >
        <h1 className='text-6xl font-bold text-green-300'>Basic Chat App</h1>
        <div className="justify-center items-center flex flex-col m-4">
          <button 
            className='p-3 m-2 bg-green-700 rounded text-white cursor-pointer'
            onClick={createRoom}
          >
            Create Room
          </button>
          <p className="m-3 text-2xl">OR</p>
          <div>
            <input type="text" name="roomId" id="roonId" 
              className="p-3 m-2 border-black rounded"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") joinRoom();
              }}
              placeholder="Enter Room Code"
            />
            <button 
              className='p-3 m-2 bg-green-700 rounded text-white cursor-pointer'
              onClick={joinRoom}
            >
              Join Room
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
