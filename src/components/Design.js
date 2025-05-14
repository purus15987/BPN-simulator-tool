import React from 'react'
import { NavLink } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'

import Workspace from './Workspace'
import Result from './Result'

function Design() {
    return (
        <div className='designing'>
            <nav className='design'>
                <NavLink className='workspace' to={'./workspace'} >workspace</NavLink>
                <NavLink className='result' to={'./result'} >result</NavLink>
            </nav>
            <Routes>

                <Route path={'/workspace'} element={<Workspace />}></Route>
                <Route path={'/result'} element={<Result />}></Route>
            </Routes>
        </div>
  )
}

export default Design
