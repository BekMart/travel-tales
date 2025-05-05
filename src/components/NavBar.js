import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Container from "react-bootstrap/Container";
import { NavLink, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";
import useWindowWidth from "../hooks/useWindowWidth";
import { removeTokenTimestamp } from "../utils/utils";
import Avatar from "./Avatar";
import NotificationsDropdown from "./NotificationDropdown";
import api from "../api/axios";
import logo from "../assets/logo.png";
import styles from "../styles/NavBar.module.css";

// Create navbar component
const NavBar = () => {
  // Gets current authenticated user/update user in context
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  // Controls dropdown menu toggle and closes on outside click
  const { expanded, setExpanded, ref } = useClickOutsideToggle();
  // Collapse menu on nav link click
  const handleNavClick = () => setExpanded(false);
  // Track and update window width on resize
  const width = useWindowWidth();
  // State to store search query
  const [query, setQuery] = useState("");
  // React Router history object for navigation
  const history = useHistory();

  // Handle Search query 
  const handleSearch = (e) => {
    e.preventDefault();
    history.push(`/search?q=${encodeURIComponent(query)}`);
    setQuery("");
  };

  // Handle sign out
  const handleSignOut = async () => {
    try {
      await api.post("dj-rest-auth/logout/");
      toast.success("Logged out successfully!");
      setCurrentUser(null);
      removeTokenTimestamp();
    } catch (err) {
      toast.error("Failed to log out.");
    }
  };

  // Handle add post
  const addPostIcon = (
    <NavLink
      className={styles.AddPost}
      to="/posts/create"
      onClick={handleNavClick}
    >
      <i className="fa-solid fa-plus" /> Add post
    </NavLink>
  );

  // Define icons to render for authenticated users
  const loggedInIcons = (
    <>
      {currentUser && addPostIcon}
      <div className="{styles.NavLink}">
        <NotificationsDropdown />
      </div>
      <NavLink className={styles.NavLink} to="/" onClick={handleNavClick}>
        <i className="fa-solid fa-house" /> Home
      </NavLink>
      <NavLink className={styles.NavLink} to="/feed" onClick={handleNavClick}>
        <i className="fa-solid fa-stream" /> Feed
      </NavLink>
      <NavLink className={styles.NavLink} to="/liked" onClick={handleNavClick}>
        <i className="fa-solid fa-heart" /> Liked
      </NavLink>
      <NavLink
        className={styles.NavLink}
        to="/locations"
        onClick={handleNavClick}
      >
        <i className="fa-solid fa-earth-asia" /> Locations
      </NavLink>
      <NavLink className={styles.NavLink} to="/" onClick={handleSignOut}>
        <i className="fa-solid fa-sign-out-alt" /> Log out
      </NavLink>
      <NavLink
        className={styles.NavLink}
        to={`/profiles/${currentUser?.profile_id}`}
        onClick={handleNavClick}
      >
        <Avatar
          src={currentUser?.profile_image}
          alt={`${currentUser?.username}'s profile picture`}
          height={50}
          className={styles.Avatar}
        />
      </NavLink>
    </>
  );

  // Define icons to render when no user is authenticated
  const loggedOutIcons = (
    <>
      <NavLink className={styles.NavLink} to="/" onClick={handleNavClick}>
        <i className="fa-solid fa-house" /> Home
      </NavLink>
      <NavLink className={styles.NavLink} to="/login" onClick={handleNavClick}>
        <i className="fa-solid fa-right-to-bracket" /> Login
      </NavLink>
      <NavLink className={styles.NavLink} to="/signup" onClick={handleNavClick}>
        <i className="fa-solid fa-user-plus" /> Sign up
      </NavLink>
    </>
  );

  return (
    <>
      <Navbar
        expanded={expanded}
        className={styles.navBar}
        expand="md"
        fixed="top"
      >
        <Container>
          {/* Logo and title */}
          <Navbar.Brand as={NavLink} to="/" className={styles.navBrand}>
            <img src={logo} alt="logo" height="80px" className={styles.logo} />
            <span className={styles.navTitle}>Travel Tales</span>
          </Navbar.Brand>

          {/* Search bar */}
          <Form inline className={styles.navSearch} onSubmit={handleSearch}>
            <Form.Label htmlFor="searchInput" className="sr-only">
              Search
            </Form.Label>
            <FormControl
              id="searchInput"
              type="text"
              placeholder="Search posts/profiles"
              className="mr-sm-2"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </Form>

          {/* Toggle */}
          <Navbar.Toggle
            ref={ref}
            onClick={() => setExpanded(!expanded)}
            className={styles.toggleBtnCustom}
          />

          {/* Collapse menu (small screens) */}
          {width < 768 && (
            <div
              ref={ref}
              className={`${
                expanded ? styles.menuOpen : styles.menuClose
              } d-md-none`}
            >
              {expanded && (
                <Nav className="flex-column text-left">
                  {currentUser ? loggedInIcons : loggedOutIcons}
                </Nav>
              )}
            </div>
          )}
        </Container>
      </Navbar>

      {/* Navigation links for larger screens */}
      <div className={styles.navLinksSection}>
        <Nav className="d-flex justify-content-center">
          {currentUser ? loggedInIcons : loggedOutIcons}
        </Nav>
      </div>
    </>
  );
};

export default NavBar;
