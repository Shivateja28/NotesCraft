import './App.css';
import Login from './components/Login';
import NavbarComp from './components/NavbarComp';
import { Route, Routes } from 'react-router-dom';
import CreateNotes from './components/CreateNotes'
import Signup from './components/Signup';
import React from 'react';
import axios from 'axios';
import Home from './components/Home';

function App() {

  return (
    <div className="App">
      <NavbarComp/>
      <Routes>
        <Route path = "/NotesCraft" element={<Home/>}></Route>
        <Route path = "/home" element={<Home/>}></Route>
        <Route path = "/login" element={<Login/>}></Route>
        <Route path = "/signup" element={<Signup/>}></Route>
        <Route path = "/createnotes" element={<CreateNotes/>}></Route>

      </Routes>   
    </div>
  );
}

export default App;
