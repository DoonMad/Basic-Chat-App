import type { MessageType } from "../types/types"
import socket from "../socket/socket"

function Message({message} : {message: MessageType}) {
  const isOwnMessage = message.id == socket.id;

  return (
    <div className={`flex w-full ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
      <div className={`rounded p-3 m-1.5 ${isOwnMessage ? 'bg-green-300' : 'bg-blue-300'} min-w-[25%] max-w-[50%] wrap-break-word`}>
        <div className="flex justify-between text-sm text-gray-700 wrap-break-word">
          {!isOwnMessage && <span>{message.user}</span>}
          <span>{message.time}</span>
        </div>

        <div className="mt-1 wrap-break-word">
          {message.text}
        </div>
      </div>
    </div>
  )
}

export default Message