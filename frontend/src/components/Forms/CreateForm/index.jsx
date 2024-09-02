import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const CreateRoomForm = ({uuid,socket,setUser}) => {
  const [roomId, setRoomId] = useState(uuid());
  const [name, setName] = useState("");
  const navigate=useNavigate();
  const handleCreateRoom=(e)=>{
    e.preventDefault()

    const roomData={
      name,
      roomId,
      userId:uuid(),
      host:true,
      presenter:true
    }
    setUser(roomData)
    navigate(`/${roomId}`)
    console.log(roomData);
    
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
                value={roomId}
                className="form-control border-0 outline-0"
                disabled
                placeholder='Generate Room Code'
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-primary  border-0 btn-sm"
                  type="button"
                  onClick={()=>setRoomId(uuid())}
                >
                  Generate
                </button>
                {/* <button className='btn btn-outline-danger btn-sm me-2' type='button'>
                    copy
                </button> */}
              </div>
            </div>
            <div className="form-group mt-5">
              <button type="submit" className="form-control btn btn-dark" onClick={handleCreateRoom}>
                Genrate Room Room
              </button>
            </div>
          </form>




  )
}

export default CreateRoomForm