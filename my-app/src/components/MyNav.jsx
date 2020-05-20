import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import Login from "./Login";

const MyNav = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <RouterLink to="/">
        <Navbar.Brand>MDQ</Navbar.Brand>
      </RouterLink>

      <Navbar.Toggle
        style={{ border: "0px" }}
        aria-controls="basic-navbar-nav"
      />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link>
            <RouterLink to="/">Home</RouterLink>
          </Nav.Link>
          <Nav.Link>
            <RouterLink to="/pantry">Pantry</RouterLink>
          </Nav.Link>
          <Nav.Link>
            <RouterLink to="/main">Main</RouterLink>
          </Nav.Link>
          <Nav.Link>
            <RouterLink to="/saved">Saved</RouterLink>
          </Nav.Link>
        </Nav>
        <Nav.Link
          style={{
            padding: 0,
            height: "2.5rem",
            width: "auto",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Login />
        </Nav.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MyNav;
