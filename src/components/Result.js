import React, { useEffect, useState } from 'react'

import Reachability from './Reachability'
import Safeness from './Safeness'



function Result() {


  const [places, InsertPlace] = useState([])
  const [transitions, InsertTransitions] = useState([])
  const [Arcs, InsertArcs] = useState([])
  const [analysis, SetAnalysis] = useState("")
  const [safeness,Setsafeness] = useState([])
  useEffect(() => {
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
  }, [])

  const [markings, setmarkings] = useState([])
  const queueMarkings = [[]];
  const [markingqueue, setmarkingQueue] = useState([]);
  const [key, setKey] = useState(0)

  const getMarkings = () => {
    setmarkingQueue([])
    for (var x = 0; x < places.length; x++) {
      queueMarkings[0].push(1)
    }
    markingqueue.push("initial marking")
    var transitionMarkings = [];
    for (x = 0; x < transitions.length; x++) {
      transitionMarkings.push(queueMarkings[0].toString())
    }
    markings.push(transitionMarkings);
    setmarkings(getMarkingsOfQueue(markings));
  }

  const getMarkingsOfQueue = (currentMarks) => {
    const currentState = queueMarkings.shift();
    markingqueue.push(currentState.toString());
    setmarkingQueue([...markingqueue, currentState.toString()]);
    for (var i = 0; i < places.length; i++) {
      places[i].tokens = currentState[i];
    }
    var transitionMarkings = []
    for (i = 0; i < transitions.length; i++) {
      transitionMarkings.push(getMarkingsAfterTransition(transitions[i]));
    }
    // console.log(markingqueue.includes(queueMarkings[0].toString()));
    while (queueMarkings.length > 1 && markingqueue.includes(queueMarkings[0].toString())) {
      queueMarkings.shift()
      console.log(queueMarkings)
    }
    // if (markingqueue.filter(markingqueue => markingqueue === queueMarkings[0].toString()).length === 1){
    //   console.log("true")
    //   const x = queueMarkings.shift()
    //   console.log(x)
    // }
    // else{
      
    // }
    if (queueMarkings.length > 0 && markingqueue.filter(markingqueue => markingqueue === queueMarkings[0].toString()).length !== 1) {
      const updatedMarks = [...currentMarks, transitionMarkings];
      // setmarkingQueue([...markingqueue, currentState.toString()]);
      return getMarkingsOfQueue(updatedMarks);
    }
    else {
      // markingqueue.push(currentState.toString())
      return [...currentMarks, transitionMarkings];
    }
  }

  const getMarkingsAfterTransition = (transition) => {
    var prevState = [];
    for (var j = 0; j < places.length; j++) {
      prevState[j] = places[j].tokens
    }
    const InputArcs = Arcs.filter(arc => arc.endingElement === transition.name);
    const OutputArcs = Arcs.filter(arc => arc.startingElement === transition.name);
    const InputPlaces = (InputArcs.map((InputArc) => places.filter(place => (place.name === InputArc.startingElement))))
    const OutputPlaces = (OutputArcs.map((OutputArc) => places.filter(place => place.name === OutputArc.endingElement)));
    // console.log(InputPlaces[0].filter(place => place.tokens === 1).length)
    // var newmarking = "";
    var inplaces = 0;
    var innerplaces = [];
    var outerplaces = [];
    if (InputPlaces.length === 0 && OutputPlaces.length === 0) {
      safeness.push("please check model again - no transition should be isolated\n Not safe at transition - "+transition.name+"\n")
      Setsafeness(safeness)
      alert(safeness);
      prevState = ["-"];
      return prevState.toString();
    }
    else {
      if (InputPlaces.length !== 0 && InputPlaces[0].length !== 0) {
        for (j = 0; j < InputPlaces.length; j++) {
          innerplaces[j] = InputPlaces[j][0];
          if (InputPlaces[j][0].tokens >= 1) {
            inplaces += InputPlaces[j][0].tokens;
          }
        }
      }
    }
    if (OutputPlaces.length !== 0) {
      for (j = 0; j < OutputPlaces.length; j++) {
        outerplaces[j] = OutputPlaces[j][0];
      }
    }
    if (inplaces >= InputPlaces.length) {
      for (var i = 0; i < places.length; i++) {
        const placeName = places[i].name;
        if (innerplaces.filter(innerplace => innerplace.name === placeName).length === 1) {
          prevState[i] = prevState[i] - 1;
        }
        if (outerplaces.filter(outerplace => outerplace.name === placeName).length === 1) {
          prevState[i] = 1;
        }
      }
      queueMarkings.push(prevState);
    }
    else {
      prevState = ["-"];
    }
    return prevState.toString();
  }
  const changeColor = (clickedButton) => {
    var buttons = document.getElementsByTagName('button');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].style.backgroundColor = 'white';
    }
    clickedButton.target.style.backgroundColor = 'green';
  }
  return (
    <div>
      <div className='analysis_buttons'>
        <button id="reachability_table" className='reachability_table' onClick={(e) => {
          e.stopPropagation();
          changeColor(e)
          if (key === 0) {
            setKey(key + 1);
            getMarkings();
          }
          SetAnalysis("reachability_table")
        }}>
          Reachability table
        </button>
        <button className='safeness' onClick={(e) => {
          e.stopPropagation();
          SetAnalysis("safeness");
          if (key === 0) {
            setKey(key + 1);
            getMarkings();
          }
          changeColor(e);
        }}>
          Safeness
        </button>
        <button className='boundedness' onClick={(e) => {
          changeColor(e);
        }}>
          Boundedness
        </button>
      </div>
      {analysis === "reachability_table" && <Reachability markings={markings} markingqueue={markingqueue} />}
      {analysis === "safeness" && <Safeness safeness={safeness} />}
    </div>
  )
}

export default Result
