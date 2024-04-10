import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";
import useUserStatus from "../hooks/useUserStatus";
import logo from "../assets/logo.png";
import { removeTokenTimestamp } from "../utils/utils";
import { NavDropdown } from "react-bootstrap";

const NavBar = () => {
  /**
   * The NavBar component is a functional component that renders the navigation bar of the application.
   * It contains links to the home page, the listings page, the about page, the contact page,
   * the sign in page, the sign up page, the user's profile page, and the sign out page.
   */
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const userStatus = useUserStatus();
  const { expanded, setExpanded, ref } = useClickOutsideToggle();
  const [servicesExpanded, setServicesExpanded] = useState(false);

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
      removeTokenTimestamp();
    } catch (err) {
      // console.log(err);
    }
  };

  const userIcons = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/about"
      >
        About
      </NavLink>
      <NavDropdown
        className={`${styles.Navdropdown} ${styles.NavLink}`}
        title="Services"
        id="basic-nav-dropdown"
        show={servicesExpanded}
        onMouseEnter={() => setServicesExpanded(true)}
        onMouseLeave={() => setServicesExpanded(false)}
      >
        <NavDropdown.Item href="/advisory">Financial Advice</NavDropdown.Item>
        <NavDropdown.Item href="/propertyManagement">
          Property Management
        </NavDropdown.Item>
        <NavDropdown.Item href="/evaluation">Evaluation</NavDropdown.Item>
        <NavDropdown.Item href="/listings">Properties</NavDropdown.Item>
      </NavDropdown>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/contact"
      >
        Contact us
      </NavLink>
    </>
  );

  const staffIcons = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/listings/create"
      >
        Add listing
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/contact_list"
      >
        Messages
      </NavLink>
    </>
  );

  const loggedInIcons = (
    <>
      <NavLink
        className={styles.NavLink}
        to={`/profiles/${currentUser?.profile_id}`}
      >
        <Avatar
          src={currentUser?.profile_image}
          text={currentUser?.username}
          height={25}
        />
      </NavLink>
      <NavLink className={styles.NavLink} to="/" onClick={handleSignOut}>
        Sign out
      </NavLink>
    </>
  );

  return (
    <Navbar
      expanded={expanded}
      className={styles.NavBar}
      expand="md"
      fixed="top"
    >
      <Container>
        <NavLink to="/">
          <Navbar.Brand>
            <img
              src={logo}
              alt="logo"
              height={45}
              style={{ borderRadius: "50%" }}
            ></img>
          </Navbar.Brand>
        </NavLink>

        <Navbar.Toggle
          ref={ref}
          onClick={() => setExpanded(!expanded)}
          aria-controls="basic-navbar-nav"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            <NavLink
              exact
              className={styles.NavLink}
              activeClassName={styles.Active}
              to="/"
            >
              Home
            </NavLink>

            {userStatus ? staffIcons : userIcons}

            {currentUser ? loggedInIcons : null}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
