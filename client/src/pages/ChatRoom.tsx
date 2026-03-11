import { useEffect, useState } from "react";
import socket from "../socket/socket"
import { useParams } from "react-router-dom"
import Message from "../components/Message";
import type { MessageType } from "../types/types";

function ChatRoom() {
  const { roomId } = useParams();
  const [msg, setMsg] = useState("");
  const [allMessages, setAllMessages] = useState<MessageType[]>([{user: "12121", text: "hi there", time: "121212121"}]);

    useEffect(() => {
      if (!roomId) return;
      socket.emit("join_room", roomId);
      return () => {
        socket.emit("leave_room", roomId);
      };
    }, [roomId]);

    const sendMessage = () => {
      if(msg && msg.trim() != "") {
        const message = {text: msg, user: socket.id, time: (new Date()).toLocaleTimeString()}
        console.log(message)
        socket.emit("send_message", {roomId, message});
      }
      // alert("message sent");
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

        <div className="bg-black grow rounded w-full text-white">
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