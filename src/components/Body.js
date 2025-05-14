import React, { useEffect, useState } from 'react'

import { TbCircle, TbRectangleVertical, TbArrowRight } from 'react-icons/tb'

import { CgRadioChecked, CgFormatText } from 'react-icons/cg'
import { MdDelete, MdEdit } from 'react-icons/md'


import {Navigate, NavLink, Routes, Route  } from 'react-router-dom'

import Sidebar from './Sidebar'
import File from './File.js'
// import Workspace from './Workspace'
// import Help from './Help'

// import Result from './Result'
import Nomatch from './Nomatch'
import Workspace from './Workspace'
import Result from './Result'
// import Workstation from './Workstation'

function Body() {
    const iconToolBar = [
        {
            id: 1,
            iconName: 'addPlace',
            iconImage: <TbCircle />
        },
        {
            id: 2,
            iconName: 'addTransition',
            iconImage: <TbRectangleVertical />
        },
        {
            id: 3,
            iconName: 'addToken',
            iconImage: <CgRadioChecked />
        },
        {
            id: 4,
            iconName: 'addArc',
            iconImage: <TbArrowRight />
        },
        {
            id: 5,
            iconName: 'addText',
            iconImage: <CgFormatText />
        },
        {
            id: 6,
            iconName: 'addComments',
            iconImage: <MdEdit />
        },
        {
            id: 7,
            iconName: 'Delete',
            iconImage: <MdDelete />
        }
    ]
    const menu = ['file', 'edit', 'view', 'tools', 'help']
    const [design, Setdesign] = useState("workspace")
    const [checkedToolIcon, SetcheckedToolIcon] = useState(0)
    // const navigate = useNavigate();
    const [workspace, InsertWorkspace] = useState([])
    const [Selectedworkspace,SetWorkspaceName] = useState("ok")
    useEffect(() => {
        fetch("http://localhost:8000/workspace").then((res) => {
            return res.json();
        }).then((resp) => {
            InsertWorkspace(resp)
        }).catch((err) => {
            console.log(err.message);
        })
        fetch("http://localhost:8000/presentworkspace").then((res) => {
            return res.json();
        }).then((resp) => {
            SetWorkspaceName(resp.name)
        }).catch((err) => {
            console.log(err.message);
        })
    }, [])
    // console.log(Selectedworkspace)
    const Idworkspace =()=>{
        if (workspace.filter(ws => ws.workspaceName === Selectedworkspace).length === 1){
            return workspace.filter(ws => ws.workspaceName === Selectedworkspace)[0].id
        }
        else return 4
    }
    const SelectedworkspaceId = Idworkspace();
    // console.log(workspace.filter(ws => ws.workspaceName === Selectedworkspace))
    const SetToolIcon = (checkedicon) => {
        if (checkedToolIcon !== 0) {
            let prevChecked = Object.values(iconToolBar).filter(icon => icon.id === checkedToolIcon);
            document.getElementById(prevChecked[0].iconName).style.color = "black";
            document.getElementById(prevChecked[0].iconName).style.fontSize = "23px"
        }
        SetcheckedToolIcon(checkedicon.id);
        document.getElementById(checkedicon.iconName).style.color = "brown";
        document.getElementById(checkedicon.iconName).style.fontSize = '26px';
    }
    const openSideBar = () => {
        console.log(design)
        document.getElementById("sidebar").style.display = "block";
    }
    const closeSome = (menuitem) => {
        if (menuitem === 'view') {
            window.location.reload(false);
        }
        if (menuitem === 'help') {
            Setdesign('help')
        }
    }

    return (
        <div className='body-container'>
            <div className='titlebar'>
                <div className='head'>Boolean Petri Nets</div>
                <div className='menu-container'>
                    <ul className='menu'>
                        {menu.map((menuitem, index) => <li key={index}>
                            <NavLink className={menuitem}
                                onClick={() => { openSideBar(); closeSome(menuitem); }} to={"/"+menuitem}  >{menuitem}</NavLink></li>)}
                    </ul>
                    <ul className='tool-bar' >
                        {iconToolBar.map(icon => <li id={icon.iconName} className={icon.iconName}
                            onClick={(e) => {
                                e.preventDefault();
                                Setdesign("workspace");
                                SetToolIcon(icon);
                            }}
                            key={icon.id}>{icon.iconImage}</li>)}
                    </ul>
                </div>
            </div>

            <div className='body'>
                <div className='designing'>

                    {/* <Workstation /> */}
                    <nav className='design'>
                        <NavLink className='workspace' onClick={() => { Setdesign("workspace") }} to={'/'+Selectedworkspace} >workspace</NavLink>
                        <NavLink className='result' onClick={() => { Setdesign("result"); }} to={'./result'} >result</NavLink>
                    </nav>
                    {/* {design === "workspace" && <Workspace iconChecked={checkedToolIcon} />} */}
                    {/* {design === "result" && < Result />}
                    {design === "help" && <Help />} */}

                    <Routes>
                        <Route path={'/file'} element={<File SetWorkspaceName={SetWorkspaceName}/>}>
                            <Route path='/file/new' element={<File />}></Route>
                        </Route>
                        <Route path={'/' + Selectedworkspace} element={<Workspace 
                        iconChecked={checkedToolIcon} 
                        workspaceName={Selectedworkspace}
                        workspaceId={SelectedworkspaceId} />}></Route>
                        <Route path='/result' element={<Result/>}></Route>
                        <Route path={'/edit'} element={<Sidebar />}></Route>
                        <Route path={'/view'} ></Route>
                        <Route path={'/tools'} element={<Sidebar />}></Route>
                        <Route path={'/help'} element={<Sidebar />}></Route>
                        <Route path={'/'} element={<Navigate to="/workspace" />}></Route>
                        <Route path={'*'} element={<Nomatch />} />
                    </Routes>
                </div>
                {/* <div className='designing'>
                </div> */}
            </div>
        </div>
    )
}

export default Body
