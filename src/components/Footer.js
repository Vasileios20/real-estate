import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

import styles from "../styles/Footer.module.css";

const Footer = () => {
  /**
   * The Footer component is a functional component that renders the footer of the application.
   */
  return (
    <Container fluid className="mt-5">
      <Row
        className={`justify-content-center align-items-center ${styles.Footer}`}
      >
        <Col>
          <Row className="flex-column justify-content-end align-items-center">
            <h5>CB Real Estate</h5>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/listings">Listings</Link>
          </Row>
        </Col>
        <Col className="d-flex justify-content-center">
          <>
            <a
              className="p-1"
              href="https://github.com/Vasileios20/real-estate"
              target="_blank"
              aria-label="Visit the game's repository page on git hub"
              rel="noreferrer"
            >
              <i className="fa-brands fa-github"></i>
            </a>
            <a
              className="p-1"
              href="https://www.linkedin.com/in/vasileios-tsimourdagkas/"
              target="_blank"
              aria-label="Visit developers LinkedIn profile"
              rel="noreferrer"
            >
              <i className="fa-brands fa-linkedin"></i>
            </a>
          </>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
