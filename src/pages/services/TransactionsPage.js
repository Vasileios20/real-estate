import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "../../styles/ServicesPages.module.css";

export default function TransacionsPage() {
  /**
   * The AboutPage component is a functional component that renders the about page.
   * It contains information about the company and its values.
   * @returns {JSX.Element}
   */

  return (
    <>
      <div className={styles.HeroImage}>

      </div>
      <Container>
        <Row className="mt-3 flex-column">
          <Col className="mt-4 mb-2">Transactions</Col>
        </Row>
      </Container>
    </>
  );
}
