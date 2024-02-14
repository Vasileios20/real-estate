import React from "react";
import SearchBar from "../../components/SearchBar";
import { Col, Container, Row } from "react-bootstrap";

export default function HomePage() {
  return (
    <>
      <SearchBar />
      <Container>
        <Row className="mt-3 flex-column">
          <Col className="my-4">
            Welcome to CB Real Estate, where your real estate dreams find their
            perfect match. Our comprehensive platform offers an extensive range
            of properties, carefully curated to cater to diverse preferences and
            budgets. Whether you're in the market to rent or sell apartments,
            houses, land, or commercial spaces, we're your ultimate destination.
          </Col>
          <Col>
            At CB Real Estate, we understand that real estate transactions can
            be both exciting and challenging. That's why our team of seasoned
            real estate experts is here to provide professional guidance at
            every step. From understanding market trends to navigating the
            complexities of property transactions, we're committed to ensuring a
            smooth and informed experience for our clients.
          </Col>
          <Col className="my-4">
            In addition to our vast listings and expert guidance, CB Real Estate
            takes pride in offering financial advice tailored to your unique
            needs. Our financial advisory services are designed to empower you
            with the knowledge needed to make sound real estate investments.
            Whether you're a first-time homebuyer or a seasoned investor, our
            personalized consultations will help you make informed decisions.
          </Col>
          <Col>
            Navigating our user-friendly platform is a breeze, saving you time
            and effort in your property search. We've designed our website for
            seamless navigation, ensuring that you can easily find the property
            that aligns with your requirements. Your real estate journey begins
            here, and we're dedicated to making it as straightforward as
            possible.
          </Col>
          <Col className="my-4">
            Transparency is the cornerstone of our approach at CB Real Estate.
            Trust us to provide accurate information and guide you through each
            transaction with openness and honesty. Whether you're looking for a
            place to call home or seeking a lucrative commercial investment, CB
            Real Estate is your partner in turning real estate aspirations into
            reality. Start your journey with us today!
          </Col>
        </Row>
      </Container>
    </>
  );
}
