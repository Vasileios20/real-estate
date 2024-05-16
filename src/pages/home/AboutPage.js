import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useTranslation } from "react-i18next";
import homeStyles from "../../styles/HomePage.module.css";
import styles from "../../styles/ServicesPages.module.css";

export default function AboutPage() {
  /**
   * The AboutPage component is a functional component that renders the about page.
   * It contains information about the company and its values.
   * @returns {JSX.Element}
   */

  const { t, i18n } = useTranslation();

  useEffect(() => {
    const lng = navigator.language || navigator.userLanguage;
    i18n.changeLanguage(lng);
  }, [i18n]);

  return (
    <>
      <div className={`d-flex flex-column justify-content-around ${homeStyles.HeroImageAbout}`}>
        <h1 className={`${styles.Header}`}>About us</h1>

      </div>
      <Container>
        <p className="h2 text-center pt-5 mt-3">{t("aboutPage.p2Title")}</p>
        <Row className={`shadow mx-auto ${styles.PageContentWrapper}`}>
          <Row className={`m-0 p-0 ${styles.PageContent}`}>
            <div className="my-5 col-11 mx-auto">
              <p>{t("aboutPage.p2")}</p>
            </div>
          </Row>
        </Row>
        <p className="h2 text-center pt-3">Why Us</p>
        <Row className="mx-auto mb-5 shadow">

          <div className={styles.PageList}>
            <ul className={styles.List}>
              <li><strong>Experience:</strong> With years of experience, our team brings a wealth of knowledge, expertise, and insight to every aspect of real estate industry.
              </li>
              <li><strong>Integrity:</strong> We conduct our business with the highest standards of integrity, honesty, and transparency, earning the trust and respect of our clients and partners.
              </li>
              <li><strong>Customer Focus:</strong> Our clients are our top priority, and we are dedicated to providing personalized attention, tailored solutions, and exceptional service to meet their unique needs.</li>
              <li><strong>Commitment to Excellence:</strong> We are committed to excellence in everything we act, continuously striving to exceed expectations and deliver outstanding results for our clients.
              </li>
              <li><strong>Expertise:</strong> Highly educated professionals with years of experience in the real estate sector.
              </li>
            </ul>
          </div>
        </Row>

        <p className="h2 text-center pt-3">Our Team</p>
        <Row className={`shadow ${styles.PageContentWrapper}`}>
          <Row className={`mx-auto ${styles.PageContent}`}>
            <div className="my-5 col-11 mx-auto">
              At Acropolis Estates, we have assembled a team of highly skilled and dedicated professionals who are passionate about real estate and dedicated to helping our clients succeed. From our experienced agents to our dedicated support staff, each member of our team is committed to providing exceptional service and unparalleled expertise. We are committed to providing personalized attention, expert advice, and unparalleled customer service to ensure a seamless and stress-free experience.
            </div>
          </Row>
        </Row>
      </Container>
    </>
  );
}
