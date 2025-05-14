import React from 'react'

function AddPlace(props) {
    const places = props.Places
    const placeSelected = (e)=>{
        e.stopPropagation();
        console.log('hi')
    }
  return (
      <g className='places'>{
          places.map((place) =>
              <g className={place.id} transform={place.translate} key={place.id} >
                  <circle r="25" fill="#D1495B" onMouseOver={()=>{placeSelected }}/>
                  <text x={-4} y={4} className='token'>1</text>
                  <text x={-5} y={40}>{place.name}</text>
                  <g id='showProperties' className='showProperties' transform={'translate(0,0'}>
                      <text>hi hello</text>
                  </g>
              </g>
          )
      }</g>
  )
}

export default AddPlace
