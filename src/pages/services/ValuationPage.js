import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import styles from "../../styles/ServicesPages.module.css";
import { useTranslation } from "react-i18next";

export default function ValuationPage() {
  /**
   * The Valuation component is a functional component that renders the valuation page.
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
      <div className={styles.HeroImageVal}>
        <h1 className={styles.Header}>{t("services.valuation")}</h1>
      </div>
      <Container>
        <Row className={`shadow my-5 mx-auto ${styles.PageContentWrapper}`}>
          <Row className={`m-0 p-0 ${styles.PageContent}`}>
            <div className="my-5 col-11 mx-auto">
              Real estate valuation involves assessing the current market value of a property, which is crucial for various purposes such as investment analysis,
              financing, insurance, taxation, and financial reporting.
            </div>
          </Row>
        </Row>

        <Row className="mx-auto mb-5 shadow">
          <div className={styles.PageList}>
            <ul className={styles.List}>
              <li><strong>Property Inspection:</strong> Conducting a thorough inspection of the property to assess its physical condition, including the building structure, interior and exterior features, amenities, and any visible defects or maintenance issues.</li>
              <li><strong>Market Analysis:</strong> Analyzing market data and trends, including recent sales of comparable properties (comps), rental rates, vacancy rates, and economic indicators, to determine the property's value relative to market conditions.</li>
              <li><strong>Comparable Sales Analysis:</strong> Identifying and analyzing sales of similar properties in the vicinity to determine their sale prices per square foot or per unit, adjusting for differences in size, location, age, condition, and other relevant factors, to estimate the subject property's market value.</li>
              <li><strong>Income Approach:</strong> Utilizing the income approach to valuation for income-producing properties, such as rental apartments, office buildings, or retail centers, by estimating the property's net operating income (NOI) and applying a capitalization rate (cap rate) or discounted cash flow (DCF) analysis to determine its value based on the income it generates.</li>
              <li><strong>Cost Approach:</strong> Employing the cost approach to valuation, which involves estimating the cost to replace or reproduce the property at current prices, adjusting for depreciation and obsolescence, to determine its value based on the cost of construction or replacement less depreciation.</li>
              <li><strong>Market Value Assessment:</strong> Integrating the findings from the property inspection, market analysis, comparable sales analysis, and income/cost approaches to arrive at an estimate of the property's fair market value, taking into account all relevant factors influencing value.</li>
              <li><strong>Report Preparation:</strong> Documenting the valuation process, methodology, assumptions, and conclusions in a formal valuation report or appraisal report, which may be used for various purposes such as investment decision-making, financing, insurance coverage, tax assessment, or financial reporting.</li>
              <li><strong>Compliance:</strong> Ensuring compliance with professional standards, regulatory requirements, and industry best practices for real estate valuation, such as those established by professional appraisal organizations (e.g., the Appraisal Institute) and governmental agencies (e.g., the Uniform Standards of Professional Appraisal Practice, or USPAP).</li>
              <li><strong>Client Communication:</strong> Communicating the valuation results, findings, and recommendations effectively to clients, stakeholders, or decision-makers, addressing any questions or concerns and providing clarity and confidence in the valuation process and outcomes.</li>
            </ul>
          </div>
        </Row>
      </Container>
    </>
  );
}
