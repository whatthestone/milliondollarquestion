import React from "react";
// import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

const MyNav = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="/">MDQ</Navbar.Brand>
      <Navbar.Toggle
        style={{ border: "0px" }}
        aria-controls="basic-navbar-nav"
      />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/pantry">Pantry</Nav.Link>
          <Nav.Link href="/main">Main</Nav.Link>
          <Nav.Link href="/saved">Saved</Nav.Link>
        </Nav>
        <Nav.Link href="/login">Login/ Logout</Nav.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MyNav;
