import { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { default as BNavbar } from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import http from "../lib/http";

function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, _] = useState(localStorage.getItem("user"));

  async function logout() {
    await http.post(
      "/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    localStorage.removeItem("user");
    localStorage.removeItem("token");

    navigate("/");
    navigate(0);
  }
  return (
    <BNavbar bg="dark" variant="dark" expand="lg">
      <Container>
        <BNavbar.Brand href="#home">Bloggerz</BNavbar.Brand>
        <BNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/search">
              Search
            </Nav.Link>
            {isLoggedIn && (
              <Nav.Link as={Link} to="/profile">
                Profile
              </Nav.Link>
            )}
          </Nav>
          <Nav className="mr-auto">
            {isLoggedIn ? (
              <Nav.Link onClick={logout}>Logout</Nav.Link>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </BNavbar.Collapse>
      </Container>
    </BNavbar>
  );
}

export default Navbar;
