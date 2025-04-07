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
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <Navbar className={styles.navBar} expand="md" fixed="top">
      <Container>
        <NavLink to="/" >
          <Navbar.Brand className={styles.navBrand}>
            <img src={logo} alt="logo" height="80px" className={styles.logo} />{" "}
            Travel Tales
          </Navbar.Brand>
        </NavLink>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className={styles.toggleBtnCustom}
        />
        <Navbar.Collapse id="basic-navbar-nav" className={styles.navLinks}>
          <Nav className="ml-auto text-left">
            <NavLink to="/">
              <i className="fa-solid fa-house" /> Home
            </NavLink>
            <NavLink to="/profile">
              <i className="fa-solid fa-user" /> Profile
            </NavLink>
            <NavLink to="/feed">
              <i className="fa-solid fa-heart" /> Feed
            </NavLink>
            <NavLink to="/login">
              <i className="fa-solid fa-right-to-bracket" /> Login
            </NavLink>
            <NavLink to="/signup">
              <i className="fa-solid fa-user-plus" /> Sign up
            </NavLink>
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
