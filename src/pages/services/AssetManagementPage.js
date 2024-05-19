import React, { useEffect } from "react";
import styles from "../../styles/ServicesPages.module.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useTranslation } from "react-i18next";
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
        <h1 className={styles.Header}>{t("services.assetManagement")}</h1>
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
              <li><strong>Property Performance Monitoring:</strong> Regularly monitoring the performance of properties to ensure they meet financial goals and operational standards.</li>
              <li><strong>Lease Management:</strong> Negotiating leases, renewals, and terminations to optimize rental income and occupancy rates.</li>
              <li><strong>Financial Analysis:</strong> Conducting financial analysis, including budgeting, forecasting, and variance analysis, to evaluate property performance and identify opportunities for improvement.</li>
              <li><strong>Risk Management:</strong> Identifying and mitigating risks associated with property ownership, such as market fluctuations, tenant defaults, and property damage.</li>
              <li><strong>Maintenance and Repairs:</strong> Overseeing maintenance and repair activities to ensure properties are well-maintained and meet safety and regulatory standards.</li>
              <li><strong>Tenant Relations:</strong> Managing tenant relationships, addressing concerns, and resolving disputes to maintain tenant satisfaction and retention.</li>
              <li><strong>Strategic Planning:</strong> Developing and implementing strategies to enhance property value, such as renovations, repositioning, or redevelopment projects.</li>
              <li><strong>Market Research:</strong> Conducting market research and analysis to identify trends, assess competition, and inform investment decisions.</li>
              <li><strong>Reporting:</strong> Preparing regular reports and updates for property owners or investors, including financial performance, market trends, and property management activities.</li>
              <li><strong>Compliance:</strong> Ensuring compliance with legal and regulatory requirements, including zoning laws, building codes, and environmental regulations.</li>
              <li><strong>Sustainability Initiatives:</strong> Implementing sustainability initiatives to reduce operating costs, improve energy efficiency, and enhance environmental stewardship.</li>
              <li><strong>Portfolio Management:</strong> Managing a portfolio of properties, including acquisitions, dispositions, and portfolio optimization strategies.</li>
              <li><strong>Asset Valuation:</strong> Conducting periodic valuations of properties to assess their current market value and potential for appreciation.</li>
              <li><strong>Stakeholder Communication:</strong> Communicating regularly with property owners, investors, lenders, and other stakeholders to provide updates and address concerns.</li>
            </ul>
          </div>
        </Row>
      </Container>
    </>
  );
}
