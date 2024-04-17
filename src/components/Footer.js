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
    <Container fluid className={`${styles.Footer} mt-4`}>
      <Container>
        <Row className="pt-3">
          <Col className="">
            <h5>Acropolis Real Estate</h5>
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

          <Col className="d-flex flex-column">
            <Row>
              <Col>
                <h5>Properties</h5>
              </Col>
            </Row>
            <Row className="justify-content-end">
              <Col className="d-flex">
                <Form.Label
                  className={`${styles.pointer} ${styles.link}`}
                  onClick={() => handleSubmit("apartment")}
                >
                  Apartment |{" "}
                </Form.Label>

                <Form.Label
                  className={`${styles.pointer} ${styles.link} ps-1`}
                  onClick={() => handleSubmit("house")}
                >
                  House |{" "}
                </Form.Label>

                <Form.Label
                  className={`${styles.pointer} ${styles.link} ps-1`}
                  onClick={() => handleSubmit("land")}
                >
                  Land |{" "}
                </Form.Label>

                <Form.Label
                  className={`${styles.pointer} ${styles.link} ps-1`}
                  onClick={() => handleSubmit("commercial")}
                >
                  Commercial
                </Form.Label>
              </Col>
            </Row>
          </Col>

        </Row>
        <Row className="text-start mt-2">
          <hr />
          <Col sm={4}>
            <p className="text-muted">
              &copy; 2021 Acropolis Real Estate. All rights reserved.
            </p>
          </Col>
          <Col sm={4} className="">
            <p className="text-muted">
              <Link to="/cookies">Cookies </Link> | <Link to="/privacyPolicy">Privacy policy</Link> | <Link to="/terms">Terms & Conditions</Link>
            </p>
          </Col>

          <Col >
            <>
              <p className="text-muted" style={{ fontSize: "12px" }}>Developed by
              </p>
            </>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Footer;
