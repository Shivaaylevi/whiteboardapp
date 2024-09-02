import { useRef, useState } from "react";
import WhiteBoard from "../../components/Whiteboard";


const RoomPage = ({user,socket,users}) => {
  const [color, setColor] = useState("#000000");
  const [tool, setTool] = useState("pencil");
  const [elements, setElements] = useState([]);
  const [history, setHistory] = useState([]);
  const [openedUserTab,setOpenedUserTab]=useState(false)

 
    const canvasRef=useRef(null)
    const ctxRef=useRef(null)

    const handleCanvasClear=()=>{
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.fillRect = "white";
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      setElements([]);
    }

    const undo = () => {
      setHistory((prevHistory) => [
        ...prevHistory,
        elements[elements.length - 1],
      ]);
      setElements((prevElements) =>
        prevElements.filter((ele, index) => index !== elements.length - 1)
      );
    };
    const redo = () => {
      setElements((prevElements) => [
        ...prevElements,
        history[history.length - 1],
      ]);
      setHistory((prevHistory) =>
        prevHistory.filter((ele, index) => index !== history.length - 1)
      );
    };
  return (
    <div className="container-fluid">
      <div className="row">
        <button type="button" className="btn btn-dark"
        style={{
          display:"block",
          position:"absolute",
          top:"5%",
          left:"5%",
          height:"40px",
          width:"100px"

        }} onClick={()=>setOpenedUserTab(true)}>User</button>
        {
          openedUserTab &&(
            <div className="position-fixed top-0 h-100 text-white bg-dark"
            style={{width:"250px",left:"0%"}}
            >
            <button
            type="button" onClick={()=>setOpenedUserTab(false)} className="btn btn-light btn-block w-100 mt-5">
            Close
            </button>
            <div className="w-100 mt-5 pt-5">
            {
              users.map((usr,index)=>(
                <p key={index*999} className="my-2 text-center w-100">{usr.name}{user && user.userId ===usr.userId && "(You)"}</p>
              ))
            }
            </div>
            </div>
          )
        }
        <h1 className="display-5 pt-4 pb-3 text-center">
          WhiteBoard Sharing <span className="text-primary">[User ONLINE:{users.length}]</span>
        </h1>
      </div>
     {
      user?.presenter &&(
        <div className="row justify-content-center align-items-center text-center py-2">
        <div className="col-md-2">
          <div className="color-picker d-flex align-items-center justify-content-center">
            Color Picker : &nbsp;
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-3">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="tools"
              id="pencil"
              value="pencil"
              checked={tool === "pencil"}
              onChange={(e) => setTool(e.target.value)}
              readOnly={true}
            />
            <label className="form-check-label" htmlFor="pencil">
              Pencil
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="tools"
              id="line"
              value="line"
              checked={tool === "line"}
              onChange={(e) => setTool(e.target.value)}
              readOnly={true}
            />
            <label className="form-check-label" htmlFor="line">
              Line
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="tools"
              id="rect"
              value="rect"
              checked={tool === "rect"}
              onChange={(e) => setTool(e.target.value)}
              readOnly={true}
            />
            <label className="form-check-label" htmlFor="rect">
              Rectangle
            </label>
          </div>
        </div>

        <div className="col-md-2">
          <button
            type="button"
            className="btn btn-outline-primary"
            disabled={elements.length === 0}
            onClick={() => undo()}
          >
            Undo
          </button>
          <button
            type="button"
            className="btn btn-outline-primary ml-1"
            disabled={history.length < 1}
            onClick={() => redo()}
          >
            Redo
          </button>
        </div>
        <div className="col-md-1">
          <div className="color-picker d-flex align-items-center justify-content-center">
            <button className="btn btn-danger" onClick={handleCanvasClear}>Clear Canvas</button>
          </div>
        </div>
      </div>
      )
     } 
      
      <div className="row canvas-box">
      <WhiteBoard canvasRef={canvasRef} ctxRef={ctxRef} elements={elements} setElements={setElements} tool={tool} color={color} user={user} socket={socket}/>
      </div>
    </div>
  );
};

export default RoomPage;