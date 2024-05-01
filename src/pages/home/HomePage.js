import React, { useEffect } from "react";

import React, { useEffect } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "../../styles/HomePage.module.css";
import Card from "react-bootstrap/Card";
import property_management from "../../assets/hero1.jpg";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SearchBar from "../../components/SearchBar";
import useFetchListings from "../../hooks/useFetchListings";

export default function HomePage() {
  /**
   * The HomePage component is a functional component that renders the home page.
   * It contains a search bar and a welcome message.
   * @returns {JSX.Element} - The JSX for the component.
   */

  const { t, i18n } = useTranslation();

  const { listings } = useFetchListings();

  useEffect(() => {
    const lng = navigator.language || navigator.userLanguage;
    i18n.changeLanguage(lng);
  }, [i18n]);
  // const lng = navigator.language || navigator.userLanguage;

  // const renderFeaturedListings = () => {
  //   return listings.map((listing) => {
  //     return (
  //       <Col key={listing.id} xs={12} md={4} className="my-2">
  //         <Card className="h-100">
  //           <Card.Img
  //             variant="top"

  //           />
  //           <Card.Body>
  //             <Card.Title>{listing.title}</Card.Title>
  //             <Card.Text>{listing.description}</Card.Text>
  //             <Link to={`/listings/${listing.id}`}>View Listing</Link>
  //           </Card.Body>
  //         </Card>
  //       </Col>
  //     );
  //   });
  // }



  return (
    <>
      <div className={`d-flex flex-column justify-content-around ${styles.HeroImage}`}>
        <p className={`h1  ${styles.Welcome}`}>Welcome to Acropolis Estates</p>
        <SearchBar />
      </div>

      <Container className="mb-4">
        <Row className="mt-3">
          <Col className="mt-4">
            <p style={{ fontSize: "1.8rem" }}>{t("homePage.description")}</p>
          </Col>
        </Row>
        <Row>
          <h2 className="my-4 text-center w-100">Our Services</h2>
          <Col xs={12} md={3} className="mt-1">
            <Link to="/assetManagement">
              <Card className="h-100">
                <img
                  src={property_management}
                  alt="Property Management"
                  className={styles.ServiceImage}
                />
                <Card.Body>
                  <Card.Title>
                    {t("services.assetManagement")}
                  </Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col xs={12} md={3} className="mt-1">
            <Link to="/advisory">
              <Card className="h-100">
                <img
                  src={property_management}
                  alt="Property Management"
                  className={styles.ServiceImage}
                />
                <Card.Body>
                  <Card.Title>
                    {t("services.financialAdvice")}
                  </Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
          {/* Valuation */}
          <Col xs={12} md={3} className="mt-1">
            <Link to="/valuation">
              <Card className="h-100">
                <img
                  src={property_management}
                  alt="Property Management"
                  className={styles.ServiceImage}
                />
                <Card.Body>
                  <Card.Title>
                    {t("services.valuation")}
                  </Card.Title>

                </Card.Body>
              </Card>
            </Link>
          </Col>

          <Col xs={12} md={3} className="mt-1">
            <Link to="/listings">
              <Card className="h-100">
                <img
                  src={property_management}
                  alt="Property Management"
                  className={styles.ServiceImage}
                />
                <Card.Body>
                  <Card.Title>
                    {t("services.properties")}
                  </Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        </Row>
        <Row>
          {/* {renderFeaturedListings()} */}
        </Row>
      </Container>
    </>
  );
}
