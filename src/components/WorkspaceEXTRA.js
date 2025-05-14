import React, { useEffect, useState } from 'react'

function WorkspaceEXTRA() {
    const [screenDimensions, SetscreenDimensions] = useState({
        height: window.innerHeight,
        width: window.innerWidth,
        WorkspaceHeight: '',
        WorkspaceWidth: ''
    })
    const getscreenDimensions = () => {
        const ws = document.getElementById('work');
        function handleResize() {
            SetscreenDimensions({
                height: window.innerHeight,
                width: window.innerWidth,
                WorkspaceHeight: ws.clientHeight,
                WorkspaceWidth: ws.clientWidth
            });
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }
    useEffect(() => {
        getscreenDimensions();
    }, [])




    return (
        <svg id="work" className='workspace1'>
            <g transform='translate(310, 170)'>
                <text x={0} y={0}>{screenDimensions.WorkspaceWidth},{screenDimensions.WorkspaceHeight}</text>
            </g>
            <g>
                <marker id="arrowhead" markerWidth="5" markerHeight="5" refX="1" refY="1.5" orient="auto" markerUnits="strokeWidth">
                    <path d="M0,0 L0,3 L3,1.5 z" fill="#f00" />
                </marker>
                <line x1={170} y1={50} x2={115} y2={50} stroke='#cd803d' strokeWidth='3px' markerEnd='url(#arrowhead)'></line>
                <line x1={170} y1={50} x2={235} y2={50} stroke='#cd803d' strokeWidth='3px' markerEnd='url(#arrowhead)'></line>
                <line x1={310} y1={50} x2={255} y2={50} stroke='#cd803d' strokeWidth='3px' markerEnd='url(#arrowhead)'></line>
                <line x1={310} y1={50} x2={375} y2={50} stroke='#cd803d' strokeWidth='3px' markerEnd='url(#arrowhead)'></line>
            </g>
            <g>
                <g transform='translate(100,25)' >
                    <rect width={10} height={50} />
                    <text x={0} y={65}>t1</text>
                </g>

                <g transform='translate(170,50)' >
                    <circle r="25" fill="#D1495B" />
                    <text x={-4} y={4} className='token'>1</text>``
                    <text x={-5} y={40}>c1</text>
                </g>

                <g transform='translate(240,25)' >
                    <rect width={10} height={50} />
                    <text x={0} y={65}>t2</text>
                </g>

                <g transform='translate(310,50)' >
                    <circle r="25" fill="#D1495B" />
                    <text x={-4} y={4} className='token'>1</text>``
                    <text x={-5} y={40}>c2</text>
                </g>

                <g transform='translate(380,25)' >
                    <rect width={10} height={50} />
                    <text x={0} y={65}>t3</text>
                </g>
            </g>
        </svg>
    )
}

export default WorkspaceEXTRA
