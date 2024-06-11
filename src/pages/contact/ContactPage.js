import React, { useEffect } from "react";
import ContactForm from "./ContactForm";
import styles from "../../styles/ServicesPages.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useTranslation } from "react-i18next";

const ContactPage = () => {
  const { t, i18n } = useTranslation();

  const lng = navigator.language || navigator.userLanguage;

  useEffect(() => {
    i18n.changeLanguage(lng);
  }, [i18n, lng]);

  return (
    <Container fluid className={`${styles.ContactPageContainer}`}>
      <Row className={`${styles.HeroImageCon}`}>
        <Col md={10} lg={8} className={`${styles.ContactPageContent} text-center`}>
          <p>{t("contactFormPage.p1") }</p>
        </Col>
        <Col sm={12} className={`${styles.ContactFormCol}`}>
          <ContactForm />
        </Col>
      </Row>
    </Container>
  );
};

export default ContactPage;
