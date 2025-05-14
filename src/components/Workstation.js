import React from 'react'

function Workstation(props) {
    console.log(props)
    if(props === 0){
        console.log("hi")
    }
    const WorkspaceStation = () =>{
        const x = 2;
        if(x === 1){
            return <div>hi</div>
        }
    }
  return (
    WorkspaceStation()
  )
}

export default Workstation
