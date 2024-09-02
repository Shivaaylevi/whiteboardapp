import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const JoinRoomForm = ({uuid,socket ,setUser}) => {
  const[roomId,setRoomId]=useState("")
  const[name,setName]=useState("")

  const navigate=useNavigate();

  const handleRoomJoin=(e)=>{
    e.preventDefault()
    const roomData={
      name,
      roomId,
      userId:uuid(),
      host:false,
      presenter:false
    }
    setUser(roomData);
    navigate(`/${roomId}`)
    socket.emit("userJoined",roomData)
  }
  return (
    <form className='form col-md-12 mt-5'>
    <div className="form-group">
      <input
        type="text"
        placeholder="Enter Your Name"
        className="form-control my-2"
        value={name}
        onChange={(e)=>setName(e.target.value)}
      />
    </div>
    <div className="input-group my-2 border align-items-center">
      <input
        type="text"
        className="form-control border-0 outline-0"
        placeholder='Enter Room Code'
        value={roomId}
        onChange={(e)=>setRoomId(e.target.value)}
      />
    </div>
    <div className="form-group mt-5">
      <button type="submit" onClick={handleRoomJoin} className="form-control btn btn-primary">
        Join Room
      </button>
    </div>
  </form>
  )
}

export default JoinRoomForm