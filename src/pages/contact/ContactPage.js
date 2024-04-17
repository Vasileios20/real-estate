import React from "react";
import ContactForm from "./ContactForm";
import styles from "../../styles/HomePage.module.css";
import { Container, Row } from "react-bootstrap";

const ContactPage = () => {
  return (
    <Container fluid>
      <Row className={`p-0 ${styles.HeroImage}`}>
        <ContactForm />
      </Row>
    </Container>
  );
};

export default ContactPage;
