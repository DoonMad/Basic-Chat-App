

function ChatRoom() {
  return (
    <div className="bg-linear-to-br from-green-400 to-fuchsia-500 text-while min-h-screen flex justify-center items-center flex-col p-5">
        <div className="bg-gray-500 grow">

        </div>
        <div className="">
            <input type="text" name="msg" id="msg" className="p-2 m-2"/>
            <input type="submit" value="Send" className="cursor-pointer border-green-600 rounded p-2 m-2"/>
        </div>
    </div>
  )
}

export default ChatRoom