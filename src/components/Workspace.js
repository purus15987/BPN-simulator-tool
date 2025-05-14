import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Workspace(props) {

  const [places, InsertPlace] = useState([])
  const [transitions, InsertTransitions] = useState([])
  const [Arcs, InsertArcs] = useState([])
  const navigate = useNavigate();
  const [Elements, SetElements] = useState({
    FirstSelectedElement: {
      IsTrue: false
    },
    SecondSelectedElement: {
      IsTrue: false
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
    // fetch("http://localhost:8000/workspace/"+props.workspaceId).then((res) => {
    //   return res.json();
    // }).then((resp) => {
    //   InsertPlace(resp.places)
    //   InsertArcs(resp.arcs)
    //   InsertTransitions(resp.transitions)
    //   console.log(resp.places.filter(place => place.id === 2))
    // }).catch((err) => {
    //   console.log(err.message);
    // })

    fetch("http://localhost:8000/places").then((res) => {
      return res.json();
    }).then((resp) => {
      InsertPlace(resp);
    }).catch((err) => {
      console.log(err.message);
    })
    fetch("http://localhost:8000/transitions").then((res) => {
      return res.json();
    }).then((resp) => {
      InsertTransitions(resp);
    }).catch((err) => {
      console.log(err.message);
    })
    fetch("http://localhost:8000/arcs").then((res) => {
      return res.json();
    }).then((resp) => {
      InsertArcs(resp);
    }).catch((err) => {
      console.log(err.message);
    })
  }, [props.workspaceId])

  const getWorkspaceCordinates = (event) => {
    SetElements({
      ...Elements,
      NoOfPlaces: Object.keys(places).length,
      NoOfTransitions: Object.keys(transitions).length,
      NoOfArcs: Object.keys(Arcs).length
    })
    const mouseWidthX = parseInt(event.clientX);
    const mouseHeightY = parseInt(event.clientY);
    var y = mouseHeightY - 150;
    var x = mouseWidthX;
    if (screenDimensions.width >= 1200) {
      x = parseInt(mouseWidthX - (screenDimensions.width * (0.2)))
    }
    return { x, y }
  }


  const TransitionRun=(element)=>{
    const InputArcs = Arcs.filter(arc => arc.endingElement===element.name);
    const OutputArcs = Arcs.filter(arc => arc.startingElement === element.name);
    const InputPlaces = (InputArcs.map((InputArc)=> places.filter(place=>(place.name===InputArc.startingElement))))
    // console.log(InputPlaces[0][0].name);
    // var TotalInputTokens = InputPlaces.map((inputplace)=>inputplace.name);
    // console.log(TotalInputTokens);
    var TotalInputTokens=0;
    for(var i=0;i<InputPlaces.length;i++){
      if(InputPlaces[i][0].tokens>=1){
        TotalInputTokens+=InputPlaces[i][0].tokens;
      }
    }
    if(TotalInputTokens>=InputArcs.length){
        const OutputPlaces = (OutputArcs.map((OutputArc)=> places.filter(place=>place.name===OutputArc.endingElement)));
        console.log(OutputPlaces);

        for(i=0;i<InputPlaces.length;i++){
          InsertPlace([
            ...places,
            {
              "coordinateX": InputPlaces[i][0].coordinateX,
              "coordinateY": InputPlaces[i][0].coordinateY,
              "name": InputPlaces[i][0].name,
              "tokens": InputPlaces[i][0].tokens-1,
              "translate": InputPlaces[i][0].translate,
              "id": Elements.NoOfPlaces+1
            }
          ])
          fetch("http://localhost:8000/places/"+InputPlaces[i][0].id, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
              "coordinateX": InputPlaces[i][0].coordinateX,
              "coordinateY": InputPlaces[i][0].coordinateY,
              "name": InputPlaces[i][0].name,
              "tokens": InputPlaces[i][0].tokens - 1,
              "translate": InputPlaces[i][0].translate,
              "id": InputPlaces[i][0].id
            })
          }).catch((err) => {
            console.log(err.message);
          })
        }
      for (i = 0; i < OutputPlaces.length; i++) {

        fetch("http://localhost:8000/places/" + OutputPlaces[i][0].id, {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            "tokens": 1
          })
        }).catch((err) => {
          console.log(err.message);
        })
        }
      navigate("/" + props.workspaceName);
        window.location.reload(false)

    }
  }



  const checkFirstSecondElements = (firstelement, secondelement) => {
    var x1 = Elements.FirstSelectedElement.coordinateX;
    var y1 = Elements.FirstSelectedElement.coordinateY;
    var x2 = secondelement.coordinateX;
    var y2 = secondelement.coordinateY;
    if (secondelement.name[0] === 'p') {  // second element is circle
      var m = (y2 - y1) / (x2 - x1);   // slope of line joining center of circle and transition
      if (x1 < x2) { // second element place is right side of first
        x2 = x2 - (25 * Math.cos(Math.atan(m))) + 5;
        y2 = y2 - (25 * Math.sin(Math.atan(m)));
      }
      else { // second element place is left side of first
        x2 = x2 + (25 * Math.cos(Math.atan(m)));
        y2 = y2 + (25 * Math.sin(Math.atan(m)));
      }
    }
    else if (secondelement.name[0] === 't') {  // second element is transition
      y2 = y2 + 25;
      if (x1 < x2) {  // second element is right side of first one
        if (y1 < y2) {  // second element is below of first one
          if ((x2 - x1) < 50) {
            x2 = x2 + 5;
            y2 = y2 - 20;
          }
        }
        else {  // second element is above of first one
          if ((x2 - x1) < 50) {
            x2 = x2 + 5;
            y2 = y2 + 20;
          }
        }
      }
      else {  // second element is left side of first one
        x2 = x2 + 10;
        if (y1 < y2) { // second element is below of first
          if ((x1 - x2) < 50) {
            x2 = x2 - 5;
            y2 = y2 - 20;
          }
        }
        else {   // second element is above of first
          if ((x1 - x2) < 50) {
            x2 = x2 - 5;
            y2 = y2 + 20;
          }
        }
      }
    }
    SetElements({
      ...Elements,
      SecondSelectedElement: {
        IsTrue: true,
        coordinateX: x2,
        coordinateY: y2,
        name: secondelement.name
      },
    })

  }

  const SelectElement = (element) => {
    if (!Elements.FirstSelectedElement.IsTrue) {
      if (element.name[0] === 'p') {
        SetElements({
          ...Elements,
          FirstSelectedElement: {
            IsTrue: true,
            coordinateX: element.coordinateX,
            coordinateY: element.coordinateY,
            name: element.name
          }
        })
      }
      else {
        SetElements({
          ...Elements,
          FirstSelectedElement: {
            IsTrue: true,
            coordinateX: element.coordinateX,
            coordinateY: element.coordinateY + 25,
            name: element.name
          }
        })
      }
    }
    else {
      if (!Elements.SecondSelectedElement.IsTrue &&
        element.name[0] !== Elements.FirstSelectedElement.name[0]) {
          const arc = Arcs.filter(arc => (arc.startingElement===Elements.FirstSelectedElement.name && arc.endingElement === element.name )).length
          if(arc>=1){
            SetElements({
              ...Elements,
              DrawArc: {},
              FirstSelectedElement: {
                IsTrue: false
              },
              SecondSelectedElement: {
                IsTrue: false
              },
              NoOfArcs: Elements.NoOfArcs + 1
            })
            alert("arc already exist");
          }
          else {
            checkFirstSecondElements(Elements.FirstSelectedElement, element);

          }
      }
    }
  }



  const DeleteElement = (element) => {
    console.log(element.name)

    if(element.name[0] === "p"){
      const inputArcs = Arcs.filter(arc => arc.endingElement === element.name)
      const outputArcs = Arcs.filter(arc => arc.startingElement === element.name)
      // console.log(inputArcs[0].id)
      for(var i=0;i<inputArcs.length;i++){
        console.log("delete input arc "+inputArcs[i].id)
        fetch("http://localhost:8000/arcs/" + inputArcs[i].id, {
          method: "DELETE",
          headers: { "content-type": "application/json" }
        }).catch((err) => {
          console.log(err.message);
        })
      }
      for(i=0;i<outputArcs.length;i++){
        console.log("delete output arc "+outputArcs[i].id)
        fetch("http://localhost:8000/arcs/" + outputArcs[i].id, {
          method: "DELETE",
          headers: { "content-type": "application/json" }
        }).catch((err) => {
          console.log(err.message);
        })
      }
      fetch("http://localhost:8000/places/" + element.id, {
        method: "DELETE",
        headers: { "content-type": "application/json" }
      }).catch((err) => {
        console.log(err.message);
      })
      navigate("/" + props.workspaceName);
      window.location.reload(false)
    }
    else if(element.name[0]==="t"){

      const inputArcs = Arcs.filter(arc => arc.endingElement === element.name)
      const outputArcs = Arcs.filter(arc => arc.startingElement === element.name)
      for (i = 0; i < inputArcs.length; i++) {
        console.log("delete input arc " + inputArcs[i].id)
        fetch("http://localhost:8000/arcs/" + inputArcs[i].id, {
          method: "DELETE",
          headers: { "content-type": "application/json" }
        }).catch((err) => {
          console.log(err.message);
        })
      }
      for (i = 0; i < outputArcs.length; i++) {
        console.log("delete output arc " + outputArcs[i].id)
        fetch("http://localhost:8000/arcs/" + outputArcs[i].id, {
          method: "DELETE",
          headers: { "content-type": "application/json" }
        }).catch((err) => {
          console.log(err.message);
        })
      }
      fetch("http://localhost:8000/transitions/" + element.id, {
        method: "DELETE",
        headers: { "content-type": "application/json" }
      }).catch((err) => {
        console.log(err.message);
      })
      navigate("/" + props.workspaceName);
      window.location.reload(false)
    }
  }

  const startInsertion = (event) => {
    event.stopPropagation();
    var WorkspaceCordinates = getWorkspaceCordinates(event);
    SetElements({
      ...Elements,
      FirstElementCordinates: {
        X1: WorkspaceCordinates.x,
        Y1: WorkspaceCordinates.y
      }
    })
  }


  const drawArc = (event) => {
    event.stopPropagation()
    var WorkspaceCordinates = getWorkspaceCordinates(event);

    if (props.iconChecked === 4 && Elements.FirstSelectedElement.IsTrue
      && !Elements.SecondSelectedElement.IsTrue) {
      SetElements({
        ...Elements,
        DrawArc: {
          X1: Elements.FirstSelectedElement.coordinateX,
          Y1: Elements.FirstSelectedElement.coordinateY,
          X2: WorkspaceCordinates.x,
          Y2: WorkspaceCordinates.y
        }
      })
    }
    else if (Elements.SecondSelectedElement.IsTrue) {
      console.log("dropped")
      console.log(Arcs)
      SetElements({
        ...Elements,
        DrawArc: {},
        FirstSelectedElement: {
          IsTrue: false
        },
        SecondSelectedElement: {
          IsTrue: false
        },
        NoOfArcs: Elements.NoOfArcs + 1
      })
      InsertArcs([
        ...Arcs,
        {
          id: Elements.NoOfArcs + 1,
          X1: Elements.FirstSelectedElement.coordinateX,
          Y1: Elements.FirstSelectedElement.coordinateY,
          X2: Elements.SecondSelectedElement.coordinateX - 5,
          Y2: Elements.SecondSelectedElement.coordinateY,
          startingElement: Elements.FirstSelectedElement.name,
          endingElement: Elements.SecondSelectedElement.name
        }
      ])
      InsertArcIntoDb();
      return console.log("done");
    }
    else {
      return
    }
  }
  const InsertArcIntoDb = () => {
    fetch("http://localhost:8000/arcs", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        X1: Elements.FirstSelectedElement.coordinateX,
        Y1: Elements.FirstSelectedElement.coordinateY,
        X2: Elements.SecondSelectedElement.coordinateX - 5,
        Y2: Elements.SecondSelectedElement.coordinateY,
        startingElement: Elements.FirstSelectedElement.name,
        endingElement: Elements.SecondSelectedElement.name
      })
    }).then((res) => {
      // navigate("/")
    }).catch((err) => {
      console.log(err.message);
    })
    // fetch("http://localhost:8000/workspace/"+props.workspaceId, {
    //   method: "PATCH",
    //   headers: { "content-type": "application/json" },
    //   body: JSON.stringify({"arcs":[...Arcs,{
    //     X1: Elements.FirstSelectedElement.coordinateX,
    //     Y1: Elements.FirstSelectedElement.coordinateY,
    //     X2: Elements.SecondSelectedElement.coordinateX - 5,
    //     Y2: Elements.SecondSelectedElement.coordinateY,
    //     startingElement: Elements.FirstSelectedElement.name,
    //     endingElement: Elements.SecondSelectedElement.name
    //   }]})
    // }).then((res) => {
    //   // navigate("/")
    // }).catch((err) => {
    //   console.log(err.message);
    // })
    navigate("/" + props.workspaceName)
  }

  const finishInsertion = (event) => {
    event.stopPropagation();
    event.preventDefault();

    var WorkspaceCordinates = getWorkspaceCordinates(event);
    if (props.iconChecked !== 0) {
      if (props.iconChecked === 1) {
        const no_of_places = ((places.length>0 ? (places[places.length - 1].id + 1):(0)))
        console.log(no_of_places)
        SetElements({
          ...Elements,
          NoOfPlaces: no_of_places
        })
        fetch("http://localhost:8000/places", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            coordinateX: WorkspaceCordinates.x,
            coordinateY: WorkspaceCordinates.y,
            name: 'p' + no_of_places,
            tokens : 1,
            translate: 'translate(' + WorkspaceCordinates.x + ',' + WorkspaceCordinates.y + ')'
          })
        }).then((res) => {
          console.log("done")
          navigate("/" + props.workspaceName)
        }).catch((err) => {
          console.log(err.message);
        })

        // fetch("http://localhost:8000/workspace/"+props.workspaceId, {
        //   method: "PATCH",
        //   headers: { "content-type": "application/json" },
        //   body: JSON.stringify({"places":[...places,{
        //     coordinateX: WorkspaceCordinates.x,
        //     coordinateY: WorkspaceCordinates.y,
        //     name: 'p' + Elements.NoOfPlaces,
        //     tokens: 1,
        //     translate: 'translate(' + WorkspaceCordinates.x + ',' + WorkspaceCordinates.y + ')'
        //   }]})
        // }).then((res) => {
        //   console.log("done")
        //   navigate("/" + props.workspaceName)
        // }).catch((err) => {
        //   console.log(err.message);
        // })
        console.log(Elements.NoOfPlaces)
        InsertPlace(
          [...places, {
            id: no_of_places,
            coordinateX: WorkspaceCordinates.x,
            coordinateY: WorkspaceCordinates.y,
            name: 'p' + no_of_places,
            tokens : 1,
            translate: 'translate(' + WorkspaceCordinates.x + ',' + WorkspaceCordinates.y + ')'
          }])
      }
      else if (props.iconChecked === 2) {
        SetElements({
          ...Elements,
          NoOfTransitions: (Elements.NoOfTransitions + 1)
        })
        fetch("http://localhost:8000/transitions", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            coordinateX: WorkspaceCordinates.x,
            coordinateY: WorkspaceCordinates.y - 25,
            name: 't' + Elements.NoOfTransitions,
            translate: 'translate(' + WorkspaceCordinates.x + ',' + (WorkspaceCordinates.y) + ')'
          })
        }).then((res) => {
          navigate("/"+props.workspaceName)
        }).catch((err) => {
          console.log(err.message);
        })
        // fetch("http://localhost:8000/workspace/"+props.workspaceId, {
        //   method: "PATCH",
        //   headers: { "content-type": "application/json" },
        //   body: JSON.stringify({"transitions":[...transitions,{
        //     coordinateX: WorkspaceCordinates.x,
        //     coordinateY: WorkspaceCordinates.y - 25,
        //     name: 't' + Elements.NoOfTransitions,
        //     translate: 'translate(' + WorkspaceCordinates.x + ',' + (WorkspaceCordinates.y) + ')'
        //   }]})
        // }).then((res) => {
        //   navigate("/" + props.workspaceName)
        // }).catch((err) => {
        //   console.log(err.message);
        // })
        InsertTransitions(
          [...transitions, {
            id: Elements.NoOfTransitions + 1,
            coordinateX: WorkspaceCordinates.x,
            coordinateY: WorkspaceCordinates.y - 25,
            name: 't' + Elements.NoOfTransitions,
            translate: 'translate(' + WorkspaceCordinates.x + ',' + (WorkspaceCordinates.y) + ')'
          }])
      }
      else if (props.iconChecked === 4) {
        SetElements({
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
  }

  return (
    <svg id="workspace1" className='workspace1'
      onMouseDown={startInsertion}
      onMouseMove={(e) => { drawArc(e) }}
      onMouseUp={finishInsertion}>
      <g>
        <marker id="arrowhead" markerWidth="5" markerHeight="5" refX="3.2" refY="1.5" orient="auto" markerUnits="strokeWidth">
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
        {places && places.map((place) =>
          <g className={place.id} transform={place.translate} key={place.id}
            onMouseUp={(event) => {
              event.stopPropagation();
            }}
            onDrag={(event) => {
              event.stopPropagation();
            }} >
            <circle r="25" fill="#D1495B"
              onMouseOver={(e) => {
                e.stopPropagation();
                // const translateCordinates = 'translate('+e.clientX+','+e.clientY+')'
                // SetShowmsg('showMsg');
              }}
              onMouseDown={(e) => {
                e.stopPropagation();
                if (props.iconChecked === 4) {
                  SelectElement(place)
                }
              }}
              onClick={(e) => {
                e.stopPropagation();
                if(props.iconChecked === 7){
                  console.log("delete place")
                  DeleteElement(place)
                }

              }}
              onMouseUp={(e) => {
                e.stopPropagation();
              }} />
            <text x={-4} y={5} className='token'>{place.tokens}</text>
            <text x={-8} y={41}>{place.name}</text>
          </g>
        )
        }
        {transitions.map((transition) =>
          <g id={transition.id} className={transition.id} transform={transition.translate} key={transition.id} draggable="true">
            <rect id={transition.name} x={-5} y={-20} width={10} height={40}
              onMouseOver={(e) => {
                e.stopPropagation();
                // const translateCordinates = 'translate('+e.clientX+','+e.clientY+')'
                document.getElementById(transition.name).style.transform = "scale(1.2)"
              }}
              onMouseLeave={(e) => {
                e.stopPropagation();
                document.getElementById(transition.name).style.transform = "scale(1)"
              }}
              onMouseDown={(e) => {
                e.stopPropagation();
                if (props.iconChecked === 4) {
                  SelectElement(transition);
                }
                if (props.iconChecked === 5){
                  TransitionRun(transition);
                }
                if (props.iconChecked === 7) {
                  console.log("delete transition")
                  DeleteElement(transition)
                }
              }}
              onMouseUp={(e) => {
                e.stopPropagation();
                // finishInsertion(e);
              }} />

            <text x={-6} y={35}>{transition.name}</text>
          </g>
        )}

      </g>
    </svg>
  )
}

export default Workspace


// a list contains multiple tuples how to delete a particular tuple when it matches the tuple id with given id