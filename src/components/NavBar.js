import React from "react";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Container,
} from "react-bootstrap";
import logo from "../assets/logo.png";
import styles from "../styles/NavBar.module.css";

const NavBar = () => {
  return (
    <Navbar className={styles.navBar} expand="md" fixed="top">
      <Container>
        <Navbar.Brand className={styles.navBrand}>
          <img src={logo} alt="logo" height="80px" className={styles.logo} /> Travel Tales
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className={styles.toggleBtnCustom} />
        <Navbar.Collapse id="basic-navbar-nav" className={styles.navLinks}>
          <Nav className="ml-auto text-left">
            <Nav.Link>
              <i className="fa-solid fa-house" /> Home
            </Nav.Link>
            <Nav.Link>
              <i className="fa-solid fa-user" /> Profile
            </Nav.Link>
            <Nav.Link>
              <i className="fa-solid fa-heart" /> Feed
            </Nav.Link>
            <Nav.Link>
              <i className="fa-solid fa-right-to-bracket" /> Login
            </Nav.Link>
            <Nav.Link>
              <i className="fa-solid fa-user-plus" /> Sign up
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Form inline className={styles.navSearch}>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-secondary">Search</Button>
        </Form>
      </Container>
    </Navbar>
  );
};

export default NavBar;
