import React, { useEffect, useState } from 'react'

function ReachabilityTree(props) {
    const [screenDimensions, SetscreenDimensions] = useState({
        height: window.innerHeight,
        width: window.innerWidth
    })
    const getscreenDimensions = () => {
        function handleResize() {
            SetscreenDimensions({
                height: window.innerHeight,
                width: window.innerWidth
            });
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }
    useEffect(() => {
        getscreenDimensions();
    },[])
    const getTransformWidthHeight=()=>{
        // props.markingqueue[1]
        return 'translate('+(screenDimensions.width/2 - 10)+","+(20)+")"
    }
    // const [ReachabilityMarkings, SetReachabiltyMarkings] = useState([])
    const getNextMarkings = (element)=>{
        console.log(element)
        return <g transform='translate(-25,50)'>
            <line x1={5} y1={-15} x2={30} y2={-50}
                stroke='#cd803d' strokeWidth='3px' >
            </line>
            <text x={-5} y={-30}>t2</text>
            <text className='marking2'>{element}</text>
        </g>
    }
    const getTransitionMarkings=(marking)=>{
        if (props.markingqueue.includes(marking)){
            var index = props.markingqueue.indexOf(marking);
            if ((props.markings[index].length)%2 === 0){
                // const newMarkings = props.markings[index].map(element=>getNextMarkings(element))
                // SetReachabiltyMarkings([...ReachabilityMarkings])
            }
            return getNextMarkings("1,0")
            // props.markings[index].forEach(element => {
            //     SetReachabiltyMarkings([...ReachabilityMarkings, getNextMarkings(element)])
            //     console.log(getNextMarkings(element))
            // });
        }
    }
return (
        <svg className='markings'>
            <g transform={getTransformWidthHeight()}>
                <text>{props.markingqueue[1]}</text>
            {getTransitionMarkings(props.markingqueue[1])}
                {/* {props.markings[1].map(m=>(<g key={m} transform="translate(-30,30)">
                    {console.log(m)}
                    <text>m</text>
                    </g>))} */}
            </g>
        </svg>
    )
}

export default ReachabilityTree
