import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Trans, useTranslation } from "react-i18next";
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
      <div className={`${homeStyles.HeroImageAbout}`}>
        <div className={`col-6 ${styles.HeaderContainer}`}>
          <h1 className={`${styles.Header}`}>{t("aboutPage.title")}</h1>
        </div>

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
        <p className="h2 text-center pt-3">{t("aboutPage.ListTitle")}</p>
        <Row className="mx-auto mb-5 shadow">

          <div className={styles.PageList}>
            <ul className={styles.List}>
              <li><Trans i18nKey="aboutPage.listItem1">{t("aboutPage.listItem1")}
              </Trans></li>
              <li>
                <Trans i18nKey="aboutPage.listItem2">{t("aboutPage.listItem2")}
                </Trans></li>
              <li><Trans i18nKey="aboutPage.listItem3">{t("aboutPage.listItem3")}
              </Trans></li>
              <li><Trans i18nKey="aboutPage.listItem4">{t("aboutPage.listItem4")}
              </Trans></li>
              <li><Trans i18nKey="aboutPage.listItem5">{t("aboutPage.listItem5")}
              </Trans></li>
            </ul>
          </div>
        </Row>

        <p className="h2 text-center pt-3">{t("aboutPage.bottomTitle")}</p>
        <Row className={`shadow mx-auto ${styles.PageContentWrapper}`}>
          <Row className={`mx-auto ${styles.PageContent}`}>
            <div className="my-5 col-11 mx-auto">
              {t("aboutPage.bottomDescription")}
            </div>
          </Row>
        </Row>
      </Container>
    </>
  );
}
