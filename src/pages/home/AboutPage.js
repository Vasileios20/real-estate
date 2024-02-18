import React from "react";
import SearchBar from "../../components/SearchBar";
import { Col, Container, Row } from "react-bootstrap";

export default function AboutPage() {
  /**
   * The AboutPage component is a functional component that renders the about page.
   * It contains information about the company and its values.
   * @returns {JSX.Element}
   */

  return (
    <>
      <SearchBar />
      <Container>
        <Row className="mt-3 flex-column">
          <Col className="mt-4 mb-2">
            Welcome to <strong>CB Real Estate</strong>, where we redefine your
            real estate experience. Established with a vision to transform the
            way people buy, sell, and invest in properties, we take pride in
            being your trusted partner in the real estate journey.
          </Col>
          <Col className="my-2">
            <h5>Our Mission</h5>
            At <strong>CB Real Estate</strong>, our mission is to simplify the
            real estate process, making it accessible, transparent, and
            rewarding for everyone. We are committed to providing a platform
            that caters to a diverse range of real estate needs, from finding
            the perfect home to making strategic commercial investments.
          </Col>
          <Col className="my-4">
            <h5>What Sets Us Apart:</h5>
            <ol>
              <li>
                <strong>Expertise:</strong> Our team of seasoned real estate
                professionals brings a wealth of knowledge and experience to the
                table. We are dedicated to guiding you through the intricacies
                of the real estate market, ensuring you make informed decisions.
              </li>
              <li>
                <strong>Diverse Listings:</strong> From cozy apartments to
                sprawling estates, prime commercial spaces to vast lands, our
                extensive and diverse listings cater to every taste and
                requirement. We understand that each property is unique, and so
                are the needs of our clients.
              </li>
              <li>
                <strong>Client-Centric Approach:</strong> Your satisfaction is
                our priority. We pride ourselves on our client-centric approach,
                ensuring that your real estate journey is not only successful
                but also enjoyable. From the initial search to closing the deal,
                we are with you every step of the way.
              </li>
            </ol>
          </Col>
          <Col className="my-4">
            <h5>Our Values:</h5>
            <ol>
              <li>
                <strong>Integrity:</strong> We uphold the highest standards of
                integrity in all our interactions. Trust is the foundation of
                any successful real estate partnership, and we are committed to
                earning and maintaining your trust.
              </li>
              <li>
                <strong>Transparency: </strong> Transparency is key to a smooth
                real estate experience. We believe in open communication,
                providing you with all the information you need to make
                confident decisions.
              </li>
              <li>
                <strong>Innovation:</strong> The real estate landscape is
                dynamic, and we embrace innovation to stay ahead of the curve.
                Our tech-savvy approach ensures that you have access to the
                latest tools and resources to enhance your real estate journey.
              </li>
            </ol>
          </Col>
          <Col className="my-4">
            <h5>Why Choose CB Real Estate:</h5>
            <ul>
              <li>Comprehensive Listings</li>
              <li>Professional Guidance</li>
              <li>Tailored Financial Advice</li>
              <li>Transparent Transactions</li>
            </ul>
          </Col>
          <Col className="mb-4">
            Thank you for considering CB Real Estate as your real estate
            partner. We look forward to helping you achieve your real estate
            goals and turning your dreams into reality.
          </Col>
        </Row>
      </Container>
    </>
  );
}
