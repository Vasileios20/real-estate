import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import styles from "../../styles/ServicesPages.module.css";
import { useTranslation } from "react-i18next";

export default function FinancialAdvicePage() {
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
      <div className={styles.HeroImageAdv}>
        <div className={`col-6 ${styles.HeaderContainer}`}>
          <h1 className={styles.Header}>{t("services.financialAdvice")}</h1>
        </div>
      </div>
      <Container>
        <Row className={`shadow my-5 mx-auto ${styles.PageContentWrapper}`}>
          <Row className={`m-0 p-0 ${styles.PageContent}`}>
            <div className="my-5 col-11 mx-auto">
              Our dedicated team is involved with advisory to provide guidance, expertise, and strategic advice to our clients to help them make informed decisions regarding their real estate investments.
            </div>
          </Row>
        </Row>

        <Row className="mb-5 mx-auto shadow">
          <div className={styles.PageList}>
            <ul className={styles.List}>
              <li><strong>Market Analysis:</strong> Conducting thorough market research and analysis to assess current trends, property values, and investment opportunities in specific geographic areas or sectors.</li>
              <li><strong>Investment Strategy:</strong> Developing tailored investment strategies based on clients' financial goals, risk tolerance, and investment preferences, including buy-and-hold, fix-and-flip, or development strategies.</li>
              <li><strong>Financial Planning:</strong> Assisting clients with financial planning, budgeting, and cash flow analysis to ensure they have a clear understanding of the financial implications of their real estate investments.</li>
              <li><strong>Risk Assessment:</strong> Identifying and evaluating potential risks associated with real estate investments, such as market volatility, regulatory changes, or property-specific issues, and providing recommendations to mitigate these risks.</li>
              <li><strong>Due Diligence:</strong> Conducting comprehensive due diligence on potential real estate acquisitions, including property inspections, title searches, environmental assessments, and financial analysis, to assess investment viability and uncover any potential issues or liabilities.</li>
              <li><strong>Portfolio Optimization:</strong> Analyzing clients' existing real estate portfolios to identify opportunities for diversification, consolidation, or disposition to optimize portfolio performance and achieve investment objectives.</li>
              <li><strong>Tax Planning:</strong> Collaborating with tax professionals to develop tax-efficient investment structures and strategies.</li>
              <li><strong>Financing Assistance:</strong> Assisting clients with securing financing for real estate acquisitions, refinancing existing loans, or structuring debt financing options to optimize leverage and enhance investment returns.</li>
              <li><strong>Exit Strategies:</strong> Developing exit strategies for clients' real estate investments, including options for selling, refinancing, or repositioning properties, to achieve optimal returns and liquidity.</li>
              <li><strong>Regulatory Compliance:</strong> Advising clients on legal and regulatory requirements related to real estate investments, including zoning laws, building codes, landlord-tenant regulations, and environmental regulations, to ensure compliance and minimize legal risks.</li>
              <li><strong>Client Education:</strong> Providing clients with educational resources, market updates, and industry insights to empower them to make informed decisions and navigate the complexities of the real estate market effectively.</li>
            </ul>
          </div>
        </Row>
      </Container>
    </>
  );
}
