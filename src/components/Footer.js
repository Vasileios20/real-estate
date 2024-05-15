import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link, useHistory } from "react-router-dom";

import styles from "../styles/Footer.module.css";
import { axiosReq } from "../api/axiosDefaults";
import { Form } from "react-bootstrap";

const Footer = () => {
  /**
   * The Footer component is a functional component that renders the footer of the application.
   */

  const history = useHistory();

  const handleSubmit = async (selectedType) => {
    // Fetch the listings from the API using the search parameters.
    let path = `/listings/?type=${selectedType}`;

    try {
      const { data } = await axiosReq.get(`${path}`);
      console.log(path);
      console.log("data", data);
      history.push(`${path}`, { data: data });
    } catch (err) {
      // console.log(err);
      if (err.response.status === 400) {
      }
    }
  };

  return (
    <Container fluid className={`${styles.Footer}`}>
      <Container>
        <Row className="pt-3 justify-content-between">
          <Col sm={6} lg={4}>
            <h5>Acropolis Estates</h5>
            <Link to="/about" className={`${styles.link}`}>
              About Us |
            </Link>
            <Link to="/contact" className={`${styles.link} ps-1`}>
              Contact |
            </Link>
            <Link to="/faq" className={`${styles.link} ps-1`}>
              FAQ
            </Link>
          </Col>

          <Col sm={6} lg={4} xl={3} className="d-flex flex-column">
            <Row>
              <Col sm={12} className="pt-2 pt-md-0">
                <h5>Properties</h5>
              </Col>
              <Col className={styles.FitContent}>
                <Form.Label
                  className={`${styles.link}`}
                  onClick={() => handleSubmit("apartment")}
                >
                  Apartment<span style={{ paddingLeft: "3px" }}>|</span>
                </Form.Label>

                <Form.Label
                  className={`${styles.link} ps-1`}
                  onClick={() => handleSubmit("house")}
                >
                  House<span style={{ paddingLeft: "3px" }}>|</span>
                </Form.Label>

                <Form.Label
                  className={`${styles.link} ps-1`}
                  onClick={() => handleSubmit("land")}
                >
                  Land<span style={{ paddingLeft: "3px" }}>|</span>
                </Form.Label>

                <Form.Label
                  className={`${styles.link} ps-1`}
                  onClick={() => handleSubmit("commercial")}
                >
                  Commercial
                </Form.Label>
              </Col>
            </Row>
          </Col>

        </Row>
        <Row className={`text-center mt-2 align-items-center`}>
          <hr />
          <Col sm={4}>
            <p className="text-muted">
              &copy; 2024 Acropolis Estates. All rights reserved.
            </p>
          </Col>
          <Col sm={4}>
            <p className="text-muted">
              <Link to="/cookies" className={`${styles.link}`}>Cookies </Link> | <Link to="/privacyPolicy" className={`${styles.link}`}>Privacy policy</Link> | <Link to="/terms" className={`${styles.link}`}>Terms & Conditions</Link>
            </p>
          </Col>
          <Col sm={4}>
            <>
              <p className="text-muted">Developed by <a href="https://github.com/Vasileios20" target="_blank" rel="noreferrer" className={`${styles.link}`}>VasileiosT</a>
              </p>
            </>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Footer;
