import React, { useState } from 'react'

import { Navigate, NavLink, useNavigate } from 'react-router-dom'

import { TbCircle, TbRectangleVertical, TbArrowRight } from 'react-icons/tb'

import { CgRadioChecked, CgFormatText } from 'react-icons/cg'
import { MdDelete, MdEdit } from 'react-icons/md'

import Sidebar from './Sidebar'
import File from './File.js'
import Workspace from './Workspace'
import Help from './Help'

import { Routes, Route } from 'react-router-dom'
import Result from './Result'
import Nomatch from './Nomatch'
import Workstation from './Workstation'

function Titlebar(props) {

  console.log(props)

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
  const navigate = useNavigate();

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
    console.log("open")
    document.getElementById("sidebar").style.display = "block";
  }
  const CloseSidebar = () => {
    document.getElementById("sidebar").style.display = "none";
    return navigate('/workspace')
  }
  const closeSome = (menuitem) =>{
    if(menuitem ==='view'){
      CloseSidebar();
      window.location.reload(false);
    }
    if(menuitem === 'help'){
      CloseSidebar();
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
                onClick={()=>{openSideBar();closeSome(menuitem);}} to={menuitem}  >{menuitem}</NavLink></li>)}
          </ul>
          <ul className='tool-bar' >
            {iconToolBar.map(icon => <li id={icon.iconName} className={icon.iconName}
              onClick={(e) => {
                e.preventDefault();
                CloseSidebar();
                Setdesign("workspace");
                SetToolIcon(icon);
                navigate('/workspace');
              }}
              key={icon.id}>{icon.iconImage}</li>)}
          </ul>
        </div>
      </div>
      <div className='body'>
        <div id={"sidebar"} className="sidebar-container">
          <NavLink className="close" to={"/workspace"} onClick={(e) => { e.preventDefault(); CloseSidebar(); }} > close </NavLink>
          <Routes>
            <Route path={'/file'} element={<File />}></Route>
            <Route path={'/file/new'} element={<File />}></Route>
            <Route path={'/edit'} element={<Sidebar />}></Route>
            <Route path={'/view'} ></Route>
            <Route path={'/tools'} element={<Sidebar />}></Route>
            <Route path={'/help'} element={<Sidebar />}></Route>
            <Route path={'/workspace'} element={console.log('oh my god')}></Route>
            <Route path={'/file/work1'} element={<Workstation Workspace={0}/>}/>
            <Route path={'/result'} element={<Result />}></Route>
            <Route path={'/'} element={<Navigate to="/workspace" />}></Route>
            <Route path={'*'} element={<Nomatch />} />
          </Routes>
        </div>
        <div className='designing'>

          <Workstation />
          <nav className='design'>
            <NavLink className='workspace' onClick={() => { Setdesign("workspace"); CloseSidebar() }} to={'./workspace'} >workspace</NavLink>
            <NavLink className='result' onClick={() => { Setdesign("result"); CloseSidebar(); }} to={'./result'} >result</NavLink>
          </nav>
          {design === "workspace" && <Workspace iconChecked={checkedToolIcon} />}
          {design === "result" && < Result />}
          {design === "help" && <Help/>}
        </div>
      </div>
    </div>
  )
}

export default Titlebar
