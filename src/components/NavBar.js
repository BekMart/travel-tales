import React, { useState } from "react";
import { Navbar, Nav, Form, FormControl, Container } from "react-bootstrap";
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
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import useWindowWidth from "../hooks/useWindowWidth";
import NotificationsDropdown from "./NotificationDropdown";
import { removeTokenTimestamp } from "../utils/utils";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const { expanded, setExpanded, ref } = useClickOutsideToggle();
  const handleNavClick = () => setExpanded(false);
  const width = useWindowWidth();

  const [query, setQuery] = useState("");
  const history = useHistory();

  const handleSearch = (e) => {
    e.preventDefault();
    history.push(`/search?q=${encodeURIComponent(query)}`);
    setQuery("");
  };

  const handleSignOut = async () => {
    try {
      await api.post("dj-rest-auth/logout/");
      toast.success("Logged out successfully!");
      setCurrentUser(null);
      removeTokenTimestamp();
    } catch (err) {
      toast.error("Failed to log out.");
      console.log(err);
    }
  };

  const addPostIcon = (
    <NavLink
      className={styles.AddPost}
      to="/posts/create"
      onClick={handleNavClick}
    >
      <i className="fa-solid fa-plus" /> Add post
    </NavLink>
  );
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
  const loggedOutIcons = (
    <>
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
            <FormControl
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
