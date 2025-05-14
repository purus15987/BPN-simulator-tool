import React, { useEffect, useState } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
// import Titlebar from './Titlebar';
import { MdDelete } from 'react-icons/md'
// import Workspace from './Workspace';
// import Workstation from './Workstation';
// import Body from './Body';
function File(props) {
  const navigate = useNavigate();
  const [workspaceName, SetWorkspaceName] = useState("")
  const [workspace, InsertWorkspace] = useState([])

  useEffect(() => {
    fetch("http://localhost:8000/workspace").then((res) => {
      return res.json();
    }).then((resp) => {
      InsertWorkspace(resp)
    }).catch((err) => {
      console.log(err.message);
    })
  }, [])
  const CloseSidebar = () => {
    document.getElementById("sidebar").style.display = "none";
    document.getElementById("create_new_workspace").style.display = "none"
  }
  const CreateNewWindow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    document.getElementById("create_new_workspace").style.display = "block"
    return navigate('/file/new');
  }
  const SubmitNewName = (e) => {
    e.stopPropagation()
    if(workspace.filter(ws => ws.workspaceName === workspaceName).length === 1){
      alert("The workspace already exists\nenter new workspace")
    }
    // console.log(workspace.includes(workspaceName))/\
    if (workspaceName !== "" && (workspace.filter(ws => ws.workspaceName === workspaceName).length=== 0)) {
      fetch("http://localhost:8000/workspace", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          workspaceName,
          "places": [],
          "arcs": [],
          "transitions": []
        })
      }).then((res) => {
        alert('new file created successfully')
      }).catch((err) => {
        console.log(err.message)
      })
      InsertWorkspace([
        ...workspace,
        {
          workspaceName,
          "places": [],
          "arcs": [],
          "transitions": [],
          "id": workspace[workspace.length-1].id + 1
        }
      ])
    }
  }

  const SetWorkspaceSelected=(ws)=>{
    fetch("http://localhost:8000/presentworkspace", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        "name" : ws.workspaceName
      }
      )
    }).catch((err) => {
      console.log(err.message);
    })

    navigate('/' + ws.workspaceName)
    window.location.reload(false);
  }

  const DeleteWorkspace=(ws)=>{
    alert("do you want to sure delete "+ ws.workspaceName)
    fetch("http://localhost:8000/workspace/" + ws.id, {
      method: "DELETE",
      headers: { "content-type": "application/json" }
    }).catch((err) => {
      console.log(err.message);
    })
    navigate('/file/new')
    window.location.reload(false)
  }

  return (

    <>
    <div id={"sidebar"} className="sidebar-container">
      <NavLink className="close" to={"/workspace"} onClick={(e) => { e.preventDefault(); CloseSidebar(); }} > close </NavLink>
      <div className='Files'>
        <nav className='files_list'>
          < Link className='new_file_create'
            onClick={(e) => {
              CreateNewWindow(e)
            }}
          >create new</ Link>
        </nav>
        <div id='create_new_workspace' className='create_new'>
          <label htmlFor='create_new' className='new_workspace'>enter workspace</label>
          <input type={'text'} id="create_new" className='new_workspace'
            value={workspaceName}
            onChange={e => { SetWorkspaceName(e.target.value) }}></input>
          <button onClick={e => { SubmitNewName(e) }} className='submit_button'>submit</button>
        </div>
        <nav className='files_list'>
          {workspace.map(ws =>
            <li key={ws.id} className={"workspace_file_name"}>
              <button className='files'
              onClick={e => {
                e.stopPropagation();
                CloseSidebar();
                SetWorkspaceSelected(ws)
              }} >{ws.workspaceName}</ button>
              <MdDelete className='delete_option' onClick={e=>{
                e.stopPropagation();
                DeleteWorkspace(ws)
              }} />
            </li>)}
        </nav>
      </div>
    </div>
    </>
  )
}
export default File
