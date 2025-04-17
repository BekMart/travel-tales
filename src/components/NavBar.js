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
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import api from "../api/axios";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  const handleSignOut = async () => {
    try {
      await api.post("dj-rest-auth/logout/");
      setCurrentUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  const addPostIcon = (
    <NavLink className={styles.AddPost} to="/posts/create">
      <i className="fa-solid fa-plus" /> Add post
    </NavLink>
  );
  const loggedInIcons = (
    <>
      {currentUser && addPostIcon}
      <NavLink className={styles.NavLink} to="/">
        <i className="fa-solid fa-house" /> Home
      </NavLink>
      <NavLink className={styles.NavLink} to="/feed">
        <i className="fa-solid fa-stream" /> Feed
      </NavLink>
      <NavLink className={styles.NavLink} to="/liked">
        <i className="fa-solid fa-heart" /> Liked
      </NavLink>
      <NavLink className={styles.NavLink} to="/" onClick={handleSignOut}>
        <i className="fa-solid fa-sign-out-alt" /> Log out
      </NavLink>
      <NavLink
        className={styles.NavLink}
        to={`/profiles/${currentUser?.profile_id}`}
      >
        <Avatar src={currentUser?.profile_image} height={40} />
      </NavLink>
    </>
  );
  const loggedOutIcons = (
    <>
      <NavLink to="/login">
        <i className="fa-solid fa-right-to-bracket" /> Login
      </NavLink>
      <NavLink to="/signup">
        <i className="fa-solid fa-user-plus" /> Sign up
      </NavLink>
    </>
  );

  return (
    <Navbar
      expanded={expanded}
      className={styles.navBar}
      expand="md"
      fixed="top"
    >
      <Container>
        <NavLink to="/">
          <Navbar.Brand className={styles.navBrand}>
            <img src={logo} alt="logo" height="80px" className={styles.logo} />{" "}
            <span className={styles.navTitle}>Travel Tales</span>
          </Navbar.Brand>
        </NavLink>
        <Navbar.Toggle
          ref={ref}
          onClick={() => setExpanded(!expanded)}
          aria-controls="basic-navbar-nav"
          className={styles.toggleBtnCustom}
        />
        <Navbar.Collapse id="basic-navbar-nav" className={styles.navLinks}>
          <Nav className="ml-auto text-left">
            {currentUser ? loggedInIcons : loggedOutIcons}
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
