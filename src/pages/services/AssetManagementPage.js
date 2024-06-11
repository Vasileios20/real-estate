import React, { useEffect } from "react";
import styles from "../../styles/ServicesPages.module.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useTranslation, Trans } from "react-i18next";
import { Col } from "react-bootstrap";

export default function AssetManagementPage() {
  /**
   * The Asset Management Page component is a functional component that renders the asset management page.
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
      <div className={styles.HeroImageAssetMgmt}>
        <div className={`col-6 ${styles.HeaderContainer}`}>
          <h1 className={styles.Header} style={{ fontSize: "3.5rem" }}>{t("services.assetManagement")}</h1>
        </div>
      </div>
      <Container>
        <Row className={`my-5 flex-wrap mx-auto justify-content-between`}>
          <Col lg={6} className={`shadow mb-0 me-lg-3 ${styles.PageContentWrapper}`}>
            <div className={`p-4 h-100 ${styles.PageContent}`}>
              We specialize in real estate asset management, offering tailored solutions to maximize returns and minimize risks for our clients.
              With years of industry experience and a dedicated team of experts, we are committed to delivering exceptional results and unparalleled service.
            </div>
          </Col>

          <Col className={`shadow mb-0 mt-5 mt-lg-0 ${styles.PageContentWrapper}`}>
            <div className={`p-4 h-100 ${styles.PageContent}`}>
              Our approach to real estate asset management is strategic and client-focused. We employ a comprehensive framework that emphasizes value creation,
              risk mitigation, and customized solutions tailored to our clients' unique objectives.
              By leveraging our deep industry knowledge and analytical capabilities, we ensure that every decision is informed and aligned with our clients' goals.
            </div>
          </Col>
        </Row>

        <Row className="shadow mx-auto mb-5">
          <div className={styles.PageList}>
            <ul className={styles.List}>
            <li><Trans i18nKey="assetManagementPage.listItem1">{t("assetManagementPage.listItem1")}
              </Trans></li>
              <li><Trans i18nKey="assetManagementPage.listItem2">{t("assetManagementPage.listItem2")}</Trans></li>
              <li><Trans i18nKey="assetManagementPage.listItem3">{t("assetManagementPage.listItem3")}</Trans></li>
              <li><Trans i18nKey="assetManagementPage.listItem4">{t("assetManagementPage.listItem4")}</Trans></li>
              <li><Trans i18nKey="assetManagementPage.listItem5">{t("assetManagementPage.listItem5")}</Trans></li>
              <li><Trans i18nKey="assetManagementPage.listItem6">{t("assetManagementPage.listItem6")}</Trans></li>
              <li><Trans i18nKey="assetManagementPage.listItem7">{t("assetManagementPage.listItem7")}</Trans></li>
              <li><Trans i18nKey="assetManagementPage.listItem8">{t("assetManagementPage.listItem8")}</Trans></li>
              <li><Trans i18nKey="assetManagementPage.listItem9">{t("assetManagementPage.listItem9")}</Trans></li>
              <li><Trans i18nKey="assetManagementPage.listItem10">{t("assetManagementPage.listItem10")}</Trans></li>
              <li><Trans i18nKey="assetManagementPage.listItem11">{t("assetManagementPage.listItem11")}</Trans></li>
              <li><Trans i18nKey="assetManagementPage.listItem12">{t("assetManagementPage.listItem12")}</Trans></li>
              <li><Trans i18nKey="assetManagementPage.listItem13">{t("assetManagementPage.listItem13")}</Trans></li>
              <li><Trans i18nKey="assetManagementPage.listItem14">{t("assetManagementPage.listItem14")}</Trans></li>
            </ul>
          </div>
        </Row>
      </Container>
    </>
  );
}
