import React, { useState,useEffect } from 'react'
import Forms from './components/Forms'
import{Routes,Route} from "react-router-dom"
import RoomPage from './pages/Room'
import io from "socket.io-client";


const server =import.meta.env.VITE_BACKEND_URL;
const connectionOptions = {
  "force new connection": true,
  reconnectionAttempts: "Infinity",
  timeout: 10000,
  transports: ["websocket"],
};
const socket = io(server, connectionOptions);


const App = () => {
  const[user,setUser]=useState(null)
  const[users,setUsers]=useState([])

  useEffect(() => {
      socket.on("userIsJoined", (data)=>{
        if(data.success){
          console.log("USer Joined");   
          setUsers(data.users)   
        }else{
          console.log("wrong");
          
        }
  })
  socket.on("allUsers",data=>{
    setUsers(data) 
  })
},[]);

  const uuid = () => {
    var S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (
      S4() +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      S4() +
      S4()
    );
  };


  return (
    <>
      <div className='container'>
        <Routes>
          <Route path='/' element={<Forms uuid={uuid} socket={socket} setUser={setUser}/>}/>
          <Route path='/:roomId' element={<RoomPage user={user} socket={socket} users={users}/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App