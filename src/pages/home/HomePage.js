import React, { useEffect } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "../../styles/HomePage.module.css";
import Card from "react-bootstrap/Card";
import property_management from "../../assets/hero.jpg";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function HomePage() {
  /**
   * The HomePage component is a functional component that renders the home page.
   * It contains a search bar and a welcome message.
   * @returns {JSX.Element} - The JSX for the component.
   */

  const { t, i18n } = useTranslation();

  useEffect(() => {
    const lng = navigator.language || navigator.userLanguage;
    i18n.changeLanguage(lng);
  }, [i18n]);
  // const lng = navigator.language || navigator.userLanguage;
  return (
    <>
      <div className={styles.HeroImage}>
        <h1 className={styles.Welcome}>Welcome to the Acropolis Estates</h1>
      </div>

      <Container>
        <Row className="mt-3">
          <Col className="my-4">
            <p style={{ fontSize: "1.4rem" }}>
              {t("homePage.description")}
            </p>
          </Col>
        </Row>
        <Row>
          <h2 className="my-4 text-center w-100">Our Services</h2>
          <Col xs={12} md={3} className="mt-1">
            <Card className="h-100">
              <img src={property_management} alt="Property Management" />

              <Card.Body>
                <Card.Title>
                  <Link to="/propertyManagement"> {t("services.assetManagement")}</Link>
                </Card.Title>
                {/* <Card.Text>
                  Our property management services are designed to help you
                  maximize your property's potential. From marketing your
                  property to handling tenant requests, we've got you covered.
                </Card.Text> */}
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={3} className="mt-1">
            <Card className="h-100">
              <img src={property_management} alt="Property Management" />

              <Card.Body>
                <Card.Title>
                  <Link to="/advisory">{t("services.financialAdvice")}</Link>
                </Card.Title>
                {/* <Card.Text>
                  Our team of real estate experts is here to provide you with
                  the best advice on buying, selling, and renting properties.
                  Let us help you make informed decisions.
                </Card.Text> */}
              </Card.Body>
            </Card>
          </Col>
          {/* Evaluation */}
          <Col xs={12} md={3} className="mt-1">
            <Card className="h-100">
              <img src={property_management} alt="Property Management" />
              <Card.Body>
                <Card.Title>
                  <Link to="/evaluation">{t("services.evaluation")}</Link>
                </Card.Title>
                {/* <Card.Text>
                  Our team of experts will evaluate your property and provide
                  you with an accurate valuation. Get in touch with us today.
                </Card.Text> */}
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} md={3} className="mt-1">
            <Card className="h-100">
              <img src={property_management} alt="Property Management" />
              <Card.Body>
                <Card.Title>
                  <Link to="/listings">{t("services.properties")}</Link>
                </Card.Title>
                {/* <Card.Text>
                  Our analytics services help you make data-driven decisions
                  about your real estate investments. Get in touch with us to
                  learn more.
                </Card.Text> */}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
