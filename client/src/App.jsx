import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from './components/Chat'
const socket = io.connect("http://localhost:1000");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const [showChat,setShowchat]=useState(false)

  const join_chat=()=>{
    if(username!=="" && room!==""){
      socket.emit("join_room",room);
      setShowchat(true);
    }
  }

  return (
    <>{
      !showChat && 
      <div className="join_room">
        <h1>Join Chat</h1>

        <input
          type="text"
          placeholder="Enter Your Name"
          onChange={(e) => setUsername(e.target.value)}
        />


        <input
          type="text"
          placeholder="Enter chat Room"
          onChange={(e) => setRoom(e.target.value)}
        />


        <button onClick={join_chat}>Join</button>

      </div>
    }
      
{
  showChat &&  <Chat socket={socket} username={username} room={room}/>

}
    </>
  );
}

export default App;
