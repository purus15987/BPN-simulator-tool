import React, { useEffect, useState } from 'react'

function Reachability(props) {
    const [transitions,InsertTransitions] = useState([]);
    useEffect(() => {
        fetch("http://localhost:8000/transitions").then((res) => {
            return res.json();
        }).then((resp) => {
            InsertTransitions(resp);
        }).catch((err) => {
            console.log(err.message);
        })
    }, [])
    // props.markingqueue.length--;
    var queueMarkingsIndex = 0;
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>markings</th>
                        {transitions.map((transition,index)=><th key={index}>{transition.name}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {props.markings.map((marking,index)=>
                    <tr key={index}>
                        <th>
                            {props.markingqueue[queueMarkingsIndex++]}
                        </th>
                        {marking.map((transitionMarking,indexkey)=>
                            <th key={indexkey}>
                                {transitionMarking}
                            </th>)}
                    </tr>)}
                </tbody>
            </table>
        </div>
    )
}

export default Reachability
