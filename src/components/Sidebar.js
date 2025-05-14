import React from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'

function Sidebar() {
  const CloseSidebar = () => {
    document.getElementById("sidebar").style.display = "none";
  }
  const navigate = useNavigate();
  return (
    <div id={"sidebar"} className="sidebar-container">
      <NavLink className="close" onClick={(e) => { 
        e.preventDefault();
        CloseSidebar();
        navigate('/') }} > close </NavLink>
      <div className='options'>
        <Link className='edit_options' >add place</Link>
        <Link className='edit_options'>add transition</Link>
        <Link className='edit_options'>add token</Link>
        <Link className='edit_options'>add arc</Link>
        <Link className='edit_options'>Run transition</Link>
        <Link className='edit_options'>delete</Link>
      </div>
    </div>
  )
}

export default Sidebar
