import React from "react";
import ContactForm from "./ContactForm";
import styles from "../../styles/ServicesPages.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

const ContactPage = () => {
  return (
    <Container fluid>
      <Row className={`${styles.HeroImageCon}`}>
        <div className={`col-6 ${styles.ContactPageContent}`}>
          Whether you're buying, selling, or investing in real estate, Acropolis Estates is here to assist.
          Contact us today to learn more about our services and how we can assist you in achieving your real estate goals.

        </div>
        <ContactForm />
      </Row>
    </Container>
  );
};

export default ContactPage;
