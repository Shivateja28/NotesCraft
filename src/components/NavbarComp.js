import { Nav, Navbar, Form, Container, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { removeUser } from '../slices/userSlice';
import { useDispatch } from 'react-redux';
import './NavbarCSS.css';
import { useSelector } from 'react-redux';
import React from 'react';



function NavbarComp() {

  let userObj = useSelector(state=>state.user);

  const dispatch = useDispatch();

  const logOut = () => {
    let actionobj = removeUser();
    dispatch(actionobj);
  };

  return (
    <Navbar expand="lg" >
      <Container fluid className='navbar'>
      <h3 className='ms-4 me-3'>Notes Maker</h3>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
            {
              userObj.length===0
              ?
                <>
                  <NavLink className="nav-link" exact to="/" >
                    <h5>Home</h5>
                  </NavLink>
                  <NavLink className="nav-link" to="/login" >
                    <h5>Login</h5>
                  </NavLink>
                  <NavLink className="nav-link" to="/signup" >
                    <h5>Signup</h5>
                  </NavLink>
                </>
              :
                <>
                  <Nav.Link className="nav-link" onClick={logOut}>
                    <h5>LogOut</h5>
                  </Nav.Link>
                  <Form className="d-flex">
                    <Form.Control
                      type="search"
                      placeholder="Search"
                      className="me-2"
                      aria-label="Search"
                    />
                    <Button variant="outline-dark">Search</Button>
                  </Form>
                  <div className='align-self-end d-flex'><img src = {userObj[0].picture} width={"10%"} referrerpolicy="no-referrer"/><div className='button'>{userObj[0].email}</div></div>
                </>
            }
            
          </Nav>
          
        </Navbar.Collapse>
      </Container>

    </Navbar>
  );
}

export default NavbarComp;
