import React from "react";
import ContactForm from "./ContactForm";
import styles from "../../styles/ServicesPages.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Col } from "react-bootstrap";

const ContactPage = () => {
  return (
    <Container fluid className={`${styles.ContactPageContainer}`}>
      <Row className={`${styles.HeroImageCon}`}>
        <Col md={10} lg={8} className={`${styles.ContactPageContent} text-center`}>

          Contact us today to learn more about our services and how we can assist you in achieving your real estate goals.
        </Col>
        <Col sm={12} className={`${styles.ContactFormCol}`}>
          <ContactForm />
        </Col>
      </Row>
    </Container>
  );
};

export default ContactPage;
