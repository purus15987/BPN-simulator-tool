import React, { useEffect, useState } from 'react'

function Workspace(props) {

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
    }, [])


    const [Elements, SetElements] = useState({
        FirstSelectedElement: {
            IsTrue: false
        },
        SecondSelectedElement: {
            IsTrue: false,
            x: '',
            y: '',
            name: ''
        },
        NoOfPlaces: 0,
        NoOfTransitions: 0,
        DrawArc: {
            X1: "",
            Y1: "",
            X2: "",
            Y2: ""
        },
        NoOfArcs: 0
    })
    const [places, InsertPlace] = useState([])
    const [transitions, InsertTransitions] = useState([])
    const [Arcs, InsertArcs] = useState([])
    const [Arc2ndElementDropped, SetArc2ndElementDropped] = useState(false)

    const getWorkspaceCordinates = (event) => {
        const mouseWidthX = parseInt(event.clientX);
        const mouseHeightY = parseInt(event.clientY);
        var y = mouseHeightY - 150;
        var x = mouseWidthX;
        if (screenDimensions.width >= 1200) {
            x = parseInt(mouseWidthX - (screenDimensions.width * (0.2)))
        }
        return { x, y }
    }

    const startInsertion = (event) => {
        var WorkspaceCordinates = getWorkspaceCordinates(event);
        SetElements({
            ...Elements,
            FirstElementCordinates: {
                X1: WorkspaceCordinates.x,
                Y1: WorkspaceCordinates.y
            }
        })
    }

    const SetFirstSelectedElement = (element) => {
        if (props.iconChecked === 4) {
            SetElements({
                ...Elements,
                FirstSelectedElement: {
                    IsTrue: true,
                    X1: element.coordinateX,
                    Y1: element.coordinateY,
                    name: element.name[0]
                }
            })
            SetArc2ndElementDropped(false)
        }
    }

    const drawArc = (event) => {
        event.stopPropagation()
        var WorkspaceCordinates = getWorkspaceCordinates(event);
        if (props.iconChecked === 4 && Elements.FirstSelectedElement.IsTrue) {
            if (!Elements.SecondSelectedElement.IsTrue) {
                SetElements({
                    ...Elements,
                    DrawArc: {
                        X1: Elements.FirstSelectedElement.X1,
                        Y1: Elements.FirstSelectedElement.Y1,
                        X2: WorkspaceCordinates.x,
                        Y2: WorkspaceCordinates.y
                    }
                })
            }
            // else if (Arc2ndElementDropped) {
            //   SetElements({
            //     ...Elements,
            //     DrawArc: {}
            //   })
            //   InsertArcs([
            //     ...Arcs,
            //     {
            //       id : Elements.NoOfArcs,
            //       X1 : Elements.FirstSelectedElement.X1,
            //       Y1 : Elements.FirstSelectedElement.Y1,
            //       X2 : Elements.SecondSelectedElement.x,
            //       Y2 : Elements.SecondSelectedElement.y,
            //       startingElement : Elements.FirstSelectedElement.name,
            //       endingElement : Elements.SecondSelectedElement.name
            //     }
            //   ])
            //   SetArc2ndElementDropped(false)
            // }
        }
        else if (Arc2ndElementDropped) {
            SetElements({
                ...Elements,
                DrawArc: {}
            })
            InsertArcs([
                ...Arcs,
                {
                    id: Elements.NoOfArcs,
                    X1: Elements.FirstSelectedElement.X1,
                    Y1: Elements.FirstSelectedElement.Y1,
                    X2: Elements.SecondSelectedElement.x,
                    Y2: Elements.SecondSelectedElement.y,
                    startingElement: Elements.FirstSelectedElement.name,
                    endingElement: Elements.SecondSelectedElement.name
                }
            ])
            SetArc2ndElementDropped(false)
        }
        else {
            return
        }
    }
    const finishInsertion = (event) => {
        event.stopPropagation();
        var WorkspaceCordinates = getWorkspaceCordinates(event);
        if (props.iconChecked !== 0) {
            if (props.iconChecked === 1) {
                SetElements({ ...Elements, NoOfPlaces: (Elements.NoOfPlaces + 1) })
                InsertPlace(
                    [...places, {
                        id: Elements.NoOfPlaces,
                        coordinateX: WorkspaceCordinates.x,
                        coordinateY: WorkspaceCordinates.y,
                        name: 'p' + Elements.NoOfPlaces,
                        translate: 'translate(' + WorkspaceCordinates.x + ',' + WorkspaceCordinates.y + ')'
                    }])
            }
            else if (props.iconChecked === 2) {
                SetElements({
                    ...Elements,
                    NoOfTransitions: (Elements.NoOfTransitions + 1)
                })
                InsertTransitions(
                    [...transitions, {
                        id: Elements.NoOfTransitions,
                        coordinateX: WorkspaceCordinates.x,
                        coordinateY: WorkspaceCordinates.y - 25,
                        name: 't' + Elements.NoOfTransitions,
                        translate: 'translate(' + WorkspaceCordinates.x + ',' + (WorkspaceCordinates.y - 25) + ')'
                    }])
            }
            else if (Arc2ndElementDropped) {
                console.log('hi')
                console.log(Arcs)
                if (Elements.FirstSelectedElement.IsTrue && Elements.SecondSelectedElement.IsTrue) {
                    console.log('hi...')
                    SetElements({
                        ...Elements,
                        DrawArc: {},
                        NoOfArcs: Elements.NoOfArcs + 1
                    })
                    InsertArcs([
                        ...Arcs,
                        {
                            id: Elements.NoOfArcs,
                            X1: Elements.FirstSelectedElement.X1,
                            Y1: Elements.FirstSelectedElement.Y1,
                            X2: Elements.SecondSelectedElement.x,
                            Y2: Elements.SecondSelectedElement.y,
                            startingElement: Elements.FirstSelectedElement.name,
                            endingElement: Elements.SecondSelectedElement.name
                        }
                    ])
                    SetArc2ndElementDropped(false)
                }
            }
        }
    }
    const cancelEvents = () => {
        if (!Arc2ndElementDropped) {
            console.log("hi")
            SetElements({
                ...Elements,
                DrawArc: {},
                FirstSelectedElement: {
                    IsTrue: false
                },
                SecondSelectedElement: {
                    IsTrue: false
                }
            })
        }
    }
    const [showMsg, SetShowmsg] = useState('showMsg')

    return (
        <svg id="workspace1" className='workspace1'
            onMouseDown={startInsertion}
            onMouseMove={(e) => { drawArc(e) }}
            onMouseUp={finishInsertion}
            onClick={cancelEvents}>
            <g>
                <marker id="arrowhead" markerWidth="5" markerHeight="5" refX="1" refY="1.5" orient="auto" markerUnits="strokeWidth">
                    <path d="M0,0 L0,3 L3,1.5 z" fill="#f00" />
                </marker>
                <line x1={Elements.DrawArc.X1} y1={Elements.DrawArc.Y1}
                    x2={Elements.DrawArc.X2} y2={Elements.DrawArc.Y2}
                    stroke='#cd803d' strokeWidth='3px' markerEnd='url(#arrowhead)'>
                </line>
                {Arcs.map((arc) =>
                    <line x1={arc.X1} y1={arc.Y1} x2={arc.X2} y2={arc.Y2} key={arc.id}
                        stroke='#cd803d' strokeWidth='3px' markerEnd='url(#arrowhead)'>
                    </line>
                )}
            </g>
            <g >
                {places.map((place) =>
                    <g className={place.id} transform={place.translate} key={place.id} onMouseUp={(event) => { event.stopPropagation(); }} >
                        <circle r="25" fill="#D1495B"
                            onMouseOver={(e) => {
                                e.stopPropagation();
                                // const translateCordinates = 'translate('+e.clientX+','+e.clientY+')'
                                SetShowmsg('showMsg');
                            }}
                            onMouseDown={(e) => {
                                e.stopPropagation();
                                SetFirstSelectedElement(place);
                                drawArc(e);
                                console.log('selected place')
                            }}
                            onMouseUp={(e) => { e.stopPropagation(); console.log('selected 2nd place') }} />
                        <text x={-4} y={5} className='token'>1</text>
                        <text x={-8} y={41}>{place.name}</text>
                    </g>
                )
                }
                {transitions.map((transition) =>
                    <g className={transition.id} transform={transition.translate} key={transition.id}>
                        <rect x={-7.5} y={0} width={15} height={50}
                            onMouseOver={(e) => {
                                e.stopPropagation();
                                // const translateCordinates = 'translate('+e.clientX+','+e.clientY+')'
                                SetShowmsg('showMsg');
                            }}
                            onMouseDown={(e) => {
                                e.stopPropagation();
                                SetFirstSelectedElement(transition);
                                drawArc(e);
                                console.log('selected transition')
                            }}
                            onMouseEnter={(e) => {
                                e.stopPropagation();
                                if (props.iconChecked === 4 && Elements.FirstSelectedElement.IsTrue) {
                                    const WorkspaceCordinates = getWorkspaceCordinates(e)
                                    SetElements({
                                        ...Elements,
                                        SecondSelectedElement: {
                                            ...Elements.SecondSelectedElement,
                                            IsTrue: true,
                                            x: WorkspaceCordinates.x,
                                            y: WorkspaceCordinates.y,
                                            name: transition.name
                                        }
                                    })
                                }
                            }}
                            //onmouseenter get coordinates
                            onMouseLeave={(e) => {
                                e.stopPropagation();
                                SetShowmsg('dontShowMsg')
                                if (props.iconChecked === 4 && Elements.FirstSelectedElement.IsTrue) {
                                    SetElements({
                                        ...Elements,
                                        SecondSelectedElement: {
                                            ...Elements.SecondSelectedElement,
                                            IsTrue: true
                                        }
                                    })
                                }
                                cancelEvents()
                                console.log(Arcs)
                                console.log(Elements.SecondSelectedElement)
                                console.log(Elements.DrawArc)
                            }}
                            onMouseUp={(e) => {
                                e.stopPropagation();
                                if (props.iconChecked === 4 && Elements.FirstSelectedElement.IsTrue) {
                                    SetArc2ndElementDropped(true);
                                }
                            }} />
                        <text x={-7} y={65}>{transition.name}</text>
                    </g>
                )}

                <g className={showMsg} transform={'translate(150,150)'} >
                    <text></text>
                </g>
            </g>
        </svg>
    )
}

export default Workspace
