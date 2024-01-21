import { Nav, Navbar, Form, Container, Button, Dropdown } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { removeUser, searchNotes, sortNotesByDateTime } from '../Slices/userSlice';
import { useDispatch } from 'react-redux';
import './NavbarCSS.css';
import { useSelector } from 'react-redux';
import React, { useState } from 'react';



function NavbarComp() {

  let user = useSelector(state=>state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = () => {
    let actionobj = removeUser();
    dispatch(actionobj);
    navigate("/login");
  };

  const searchNotesByTitle = (e)=>{
    let actionobj = searchNotes(e.target.value);
    dispatch(actionobj);
    console.log(e.target.value);
    if(user.notes.length!==0){
      user.notes.filter(note => note.title.toLowerCase().includes(e.target.value.toLowerCase()));
    }
  };

  const otn = ()=>{
    dispatch(sortNotesByDateTime(true));
  }

  const nto=()=>{
    dispatch(sortNotesByDateTime(false))
  }

  return (
    <Navbar expand="lg" >
      <Container fluid className='navbar'>
      <h2 className='ms-4 pt-3 me-3'>NotesCraft</h2>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto text-end pt-lg-1 my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
            {
              !user.login
              ?
                <>
                  <NavLink className="nav-link text-white" exact to="/home" >
                    <h5>Home</h5>
                  </NavLink>
                  <NavLink className="nav-link text-white" to="/login" >
                    <h5>Login</h5>
                  </NavLink>
                  <NavLink className="nav-link text-white" to="/signup" >
                    <h5>Signup</h5>
                  </NavLink>
                </>
              :
                <>
                  
                  

                    <input
                      type="search"
                      placeholder="Search By Title"
                      className="me-2 rounded border-success"
                      aria-label="Search"
                      onChange={searchNotesByTitle}
                    />

                  <Dropdown className="me-2">
                    <Dropdown.Toggle id="dropdown-basic">
                      Sort
                    </Dropdown.Toggle>

                    <Dropdown.Menu className='dropdown-menu'>
                      <Dropdown.Item className='dropdown-item' onClick={otn}>Old to New</Dropdown.Item>
                      <Dropdown.Item className='dropdown-item' onClick={nto}>New to Old</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                
                  <Dropdown className="me-2">
                    <Dropdown.Toggle id="dropdown-basic">
                      {user.userObj.email}
                    </Dropdown.Toggle>

                    <Dropdown.Menu className='dropdown-menu'>
                      <Dropdown.Item className='dropdown-item' onClick={logOut}>LogOut</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </>
            }
            
          </Nav>
          
        </Navbar.Collapse>
      </Container>

    </Navbar>
  );
}

export default NavbarComp;
