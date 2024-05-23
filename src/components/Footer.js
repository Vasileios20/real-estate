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
          <Col sm={3} className="d-flex flex-column">
            <h5>Acropolis Estates</h5>
            <Link to="/about" className={`${styles.link}`}>
              About Us
            </Link>
            <Link to="/faq" className={`${styles.link} `}>
              FAQ
            </Link>
            <div className={styles.Social}>
              <a href="https://www.facebook.com/profile.php?id=100087858451493" target="_blank"
                aria-label="Visit our Facebook page" rel="noreferrer"><i class="fa-brands fa-facebook"></i></a>
              <a href="https://instagram.com" target="_blank" aria-label="Visit our Instagram page" rel="noreferrer"><i
                class="fa-brands fa-instagram"></i></a>
              <a href="https://linkedin.com" target="_blank" aria-label="Visit our Youtube page" rel="noreferrer"><i
                class="fa-brands fa-linkedin"></i></a>
            </div>
          </Col>

          <Col sm={3} className={`d-flex flex-column ${styles.MobileMarginTop}`}>
            <h5>Properties</h5>
            <Form.Label
              className={`${styles.link}`}
              onClick={() => handleSubmit("apartment")}
            >
              Apartment
            </Form.Label>

            <Form.Label
              className={`${styles.link}`}
              onClick={() => handleSubmit("house")}
            >
              House
            </Form.Label>

            <Form.Label
              className={`${styles.link}`}
              onClick={() => handleSubmit("land")}
            >
              Land
            </Form.Label>

            <Form.Label
              className={`${styles.link}`}
              onClick={() => handleSubmit("commercial")}
            >
              Commercial
            </Form.Label>


          </Col>
          <Col sm={3} className={`${styles.MobileMarginTop}`}>
            <h5 className="">Contact</h5>
            <div className="">

              <p className="m-0">Office Address: 28is Octovriou, 211</p>
              <p className="m-0">City: Nea Peramos, Attikis</p>
              <p className="m-0">Email: info@acropolisestates.com</p>
              <p className="m-0">Phone Number: +30 229 640 0420</p>
            </div>
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
