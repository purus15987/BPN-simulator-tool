import React,{useState} from 'react'


function Editor() {



  const [drawing, setDrawing] = useState(false);


  const startInsertion = (event) =>{
    setDrawing(true);
    const x = parseInt(event.clientX);
    const y = parseInt(event.clientY);
    console.log(x,y);
    
  }
  const draw = (event) =>{
    if(!drawing) return;
    const x = event.clientX
    const y = event.clientY;
    console.log(x,y);
  }

  const finishInsertion = () =>{
    setDrawing(false);

  }

  return (
    <svg className='workspace' onMouseDown={startInsertion} onMouseUp={finishInsertion} onMouseMove={draw}>
        <g transform='translate(40,40)'>
            <text>x</text>
        </g>
    </svg>
  )
}

export default Editor
