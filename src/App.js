import './components/project.css'
import Navbar from './components/Navbar';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Body from './components/Body';
function App() {
  return (
    <BrowserRouter>
      <div className="App" id='app_screen'>
        <Navbar />
        <Body/>
      </div>
    </BrowserRouter>
  );
}

export default App;
