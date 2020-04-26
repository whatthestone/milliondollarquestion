import React from "react";
// import { Link } from "react-router-dom";
import { Navbar, NavDropdown } from "react-bootstrap";

const Nav = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Link to="/">Dashboard</Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Link to="/main">Main</Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
          <Link to="/profile">Profile</Link>
          <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>

    //
    // <ul>
    //   <li>
    //     <Link to="/">Dashboard</Link>
    //   </li>
    //   <li>
    //     <Link to="/profile">Profile</Link>
    //   </li>
    //   <li>
    //     <Link to="/main">Main</Link>
    //   </li>
    // </ul>
  );
};

export default Nav;
