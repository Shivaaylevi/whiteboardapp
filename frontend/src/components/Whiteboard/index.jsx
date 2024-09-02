import React, { useEffect, useLayoutEffect, useState } from 'react'
import rough from "roughjs"
const roughGenerator=rough.generator();
const WhiteBoard = ({canvasRef, ctxRef, elements,setElements,tool,color,user,socket}) => {
  
  const[img,setImg]=useState(null)

  useEffect(()=>{
    socket.on("whiteBoardDataResponse",(data)=>{
      setImg(data.imgURL)
    });
  },[])

  if(!user?.presenter){
    return(
      <div className='h-100 w-100 border-3 border-dark border overflow-hidden'>
      <img src={img} alt="Shared By Presenter" className='w-100 h-100'/>
      </div>
    )
  }

  const[isDrawing,setIsDrawing]=useState(false)

  useEffect(()=>{
    const canvas=canvasRef.current;
    canvas.height=window.innerHeight
    canvas.width=window.innerWidth
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    const ctx=canvas.getContext("2d")
    ctx.lineCap = "round";
    ctx.strokeStyle = color;
    ctx.lineWidth = 5;

    ctxRef.current=ctx;

  },[]);

  useEffect(() => {
    ctxRef.current.strokeStyle = color;
  }, [color]);

  useLayoutEffect(()=>{
    if(canvasRef){
    const roughCanvas=rough.canvas(canvasRef.current)

    if(elements.length>0){
      ctxRef.current.clearRect(
        0,0,canvasRef.current.width,canvasRef.current.height
      )
    }

    elements.forEach((elements) => {
      if(elements.type=="rect"){
        roughCanvas.draw(
          roughGenerator.rectangle(elements.offsetX, elements.offsetY, elements.width, elements.height,
            {
              stroke:elements.stroke,
              roughness: 0,
              strokeWidth: 5,
            }
          )
        )
      }
      else if(elements.type=="pencil"){
        roughCanvas.linearPath(elements.path,{
          
            stroke:elements.stroke,
            roughness: 0,
            strokeWidth: 5,
          
        });
      }
      else if(elements.type=="line"){
        roughCanvas.draw(
          roughGenerator.line(elements.offsetX,elements.offsetY,elements.width,elements.height,{
            
              stroke:elements.stroke,
              roughness: 0,
              strokeWidth: 5,
            
          })
        )
      }
    }
  );
  const canvasImage=canvasRef.current.toDataURL();
  socket.emit("whiteboardData",canvasImage)
}
  },[elements])

  const handleMouseDown=(e)=>{
    const { offsetX, offsetY } = e.nativeEvent;

    if(tool=="pencil"){

      setElements((prevElement) => [
        ...prevElement,
        {
          type:"pencil",
          offsetX,
          offsetY,
          path: [[offsetX, offsetY]],
          stroke: color,
        },
      ]);
    }
    else if (tool=="line"){
      setElements((prevElement)=>[
        ...prevElement,
        {
          type:"line",
          offsetX,
          offsetY,
          width:offsetX,
          height:offsetY,
          stroke:color,
        }

      ])
  }
  else if(tool=="rect"){
    setElements((prevElement)=>[
      ...prevElement,
      {
        type:"rect",
        offsetX,
        offsetY,
        width:0,
        height:0,
        stroke:color,
      }

    ])
  }
    setIsDrawing(true)
  }
  const handleMouseMove=(e)=>{
    const { offsetX, offsetY } = e.nativeEvent;

    if(isDrawing){
      if(tool=="pencil"){
        const {path}=elements[elements.length-1];
        const newPath=[...path,[offsetX,offsetY]];
        setElements((prevElement)=>
          prevElement.map((ele,index)=>{
            if(index==elements.length-1){
                return{
                  ...ele,
                  path:newPath
                } 
            } else{
              return ele;
            }
          })
        )
      }
      else if(tool=="line"){
        setElements((prevElement)=>
          prevElement.map((ele,index)=>{
            if(index==elements.length-1){
                return{
                  ...ele,
                  width:offsetX,
                  height:offsetY,
                } 
            } else{
              return ele;
            }
          })
        )

      }
      else if(tool=="rect"){
        setElements((prevElement)=>
          prevElement.map((ele,index)=>{
            if(index==elements.length-1){
                return{
                  ...ele,
                  width:offsetX-ele.offsetX,
                  height:offsetY-ele.offsetY,
                } 
            } else{
              return ele;
            }
          })
        )
      }
    }
  }
  const handleMouseUp=(e)=>{
    setIsDrawing(false);
  }
  return (
      <div 
       onMouseDown={handleMouseDown}
    onMouseMove={handleMouseMove}
    onMouseUp={handleMouseUp}
     className='h-100 w-100 border-3 border-dark border overflow-hidden'
     >
        <canvas ref={canvasRef}/>
      </div>
  )
}

export default WhiteBoard

