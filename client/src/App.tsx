import './App.css'


function App() {
  const joinLobby = () => {
    
  }

  const createLobby = () => {

  }

  return (
    <>
      <div 
        className='bg-linear-to-br from-green-400 to-fuchsia-500 text-while min-h-screen flex justify-center items-center flex-col'
      >
        <h1 className='text-4xl font-bold text-green-300 '>Basic Chat App</h1>
        <div>
          <button 
            className='p-3 m-2 bg-green-700 rounded text-white cursor-pointer'
            onClick={joinLobby}
          >
            Create Lobby
          </button>
          <button 
            className='p-3 m-2 bg-green-700 rounded text-white cursor-pointer'
            onClick={createLobby}
          >
            Join Lobby
          </button>
        </div>
      </div>
    </>
  )
}

export default App
