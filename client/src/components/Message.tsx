import type { MessageType } from "../types/types"

function Message({message} : {message: MessageType}) {

  return (
    <div className="bg-blue-300 rounded p-3 m-2 max-w-md">
      <div className="flex justify-between text-sm text-gray-700">
        <span>{message.user}</span>
        <span>{message.time}</span>
      </div>

      <div className="mt-1">
        {message.text}
      </div>
    </div>
  )
}

export default Message