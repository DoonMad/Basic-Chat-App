import { useEffect, useState } from "react";
import socket from "../socket/socket"
import { useParams } from "react-router-dom"
import Message from "../components/Message";
import type { MessageType } from "../types/types";
import { useNavigate } from "react-router-dom";

function ChatRoom() {
  const { roomId } = useParams();
  const [msg, setMsg] = useState("");
  const [allMessages, setAllMessages] = useState<MessageType[]>([]);
  const navigate = useNavigate();
  const username = sessionStorage["username"];

  useEffect(() => {
    if (!roomId) return;
    const checkRoom = async () => {
      const res = await fetch(`http://localhost:3000/api/rooms/${roomId}`);

      if (res.status !== 200) {
        alert("Room does not exist");
        navigate("/");
        return;
      }

      console.log(username);

      if(!username || username.trim() === "") {
        alert("Enter a username first");
        navigate("/");
        return;
      }

      socket.emit("join_room", roomId);
    };

    checkRoom();

    return () => {
      socket.emit("leave_room", roomId);
    };
  }, [roomId]);

  const sendMessage = () => {
    if(msg && msg.trim() != "") {
      const message = {text: msg, user: username, time: (new Date()).toLocaleTimeString(), id: socket.id}
      setMsg("");
      socket.emit("send_message", {roomId, message});
    }
  }

  useEffect(() => {
    const handler = (message: MessageType) => {
      setAllMessages(prev => [...prev, message]);
    };

    socket.on("receive_message", handler);

    return () => {
      socket.off("receive_message", handler);
    };
  }, []);


  return (
    <div className="bg-linear-to-br from-green-400 to-fuchsia-500 text-while min-h-screen flex justify-center items-center flex-col p-5">

        <div className={`bg-black grow rounded w-full text-white`}>
          {allMessages.map((message, index) => (
            <Message key={index} message={message} />
          ))}
        </div>

        <div className="">
            <input type="text" 
              name="msg" 
              id="msg" 
              className="p-2 m-2"
              value={msg}
              placeholder="Enter your message..."
              onChange={(e) => {setMsg(e.target.value)}}
            />
            <button 
              className="cursor-pointer border-green-600 rounded p-2 m-2"
              onClick={sendMessage}
            > 
              Send
            </button>
        </div>
    </div>
  )
}

export default ChatRoom