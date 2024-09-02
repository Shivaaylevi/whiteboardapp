import React from 'react'
import "./index.css"
import CreateRoomForm from './CreateForm'
import JoinRoomForm from './JoinForm'
const Forms = ({uuid,socket,setUser}) => {
  return (
    <div className='row h-100 pt-5'>
        <div className='form-box col-md-4  p-5 mt-5 border border-2 rounded-2 d-flex flex-column aline-items-center mx-auto'>
            <h1 className='text-primary fw-bold'>Create Room</h1>
            <CreateRoomForm uuid={uuid} socket={socket} setUser={setUser}/>
        </div>
        <div className='form-box col-md-4  p-5 mt-5 border border-2 rounded-2 d-flex flex-column aline-items-center mx-auto'>
            <h1 className='text-primary fw-bold'>Join Room</h1>
            <JoinRoomForm uuid={uuid} socket={socket} setUser={setUser}/>
        </div>
    </div>
  )
}

export default Forms