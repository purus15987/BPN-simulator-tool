import React,{useEffect, useState, useRef} from 'react'

function Canvas() {

  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [drawing, setDrawing] = useState(false);


  const [screenDimensions,SetscreenDimensions] = useState({
    height: window.innerHeight,
    width : window.innerWidth
  })
  const getscreenDimensions = ()=>{
    function handleResize() {
      SetscreenDimensions({
        height: window.innerHeight,
        width : window.innerWidth
      });
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }
  useEffect(() => {
    getscreenDimensions();
    const canvas = canvasRef.current;
    const workspace = document.getElementById('canvas');
    canvas.width = workspace.clientWidth;
    canvas.height = workspace.clientHeight;
    const context = canvas.getContext("2d");
    context.clearRect(0,0,canvas.width,canvas.height);
    contextRef.current = context;
  },[])

  const startInsertion = (event) =>{
    setDrawing(true);
    const x = parseInt(event.clientX);
    const y = parseInt(event.clientY);
    console.log(x,y);
    contextRef.current.beginPath();
    contextRef.current.arc(x, y-150, 40, 0, 2 * Math.PI, false);
    contextRef.current.fillStyle = 'green';
    contextRef.current.fill();
    contextRef.current.lineWidth = 5;
    contextRef.current.strokeStyle = '#003300';
    contextRef.current.stroke();
    event.preventDefault();
  }
  const draw = (event) =>{
    if(!drawing) return;
    const {x,y} = event;
    console.log(x,y)
  }

  const finishInsertion = () => {
    setDrawing(false);
  }
  return (
    <div id='canvas' className='canvas-container'>
    <p>{screenDimensions.height},{screenDimensions.width}</p>
    <canvas ref={canvasRef} onMouseDown={startInsertion} onMouseUp={finishInsertion} onMouseMove={draw}>
    </canvas>
    </div>
  )
}

export default Canvas
