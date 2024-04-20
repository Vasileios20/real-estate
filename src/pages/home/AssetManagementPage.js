import React, { useEffect } from "react";
import styles from "../../styles/HomePage.module.css";

import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";

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
      <div className={styles.HeroImage}>
        <h1 className={styles.Welcome}> {t("services.assetManagement")}</h1>
      </div>
      <Container>
        <Row className="mt-3 flex-column">
          <Col className="mt-4 mb-2">

            <ul>
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
          </Col>
        </Row>
      </Container>
    </>
  );
}
