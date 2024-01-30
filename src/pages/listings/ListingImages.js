import React from "react";
import styles from "../../styles/Listing.module.css";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

const ListingImages = ({ images = [{}], id }) => {
  return (
    <Container fluid className={styles.Listing__Images}>
      <Row>
        <Col md={6} className="p-0 pr-1">
          {images?.slice(1, 2).map((image) => (
            <img
              className={styles.ImageLeft}
              key={image.id}
              src={image.images.length > 0 ? image.images : images}
              alt={image.id}
            />
          ))}
        </Col>
        <Col md={6} className="p-0">
          <Row>
            {images.slice(1, 5).map((image) => (
              <Col md={6} key={image.id}>
                <Image
                  src={image.images}
                  alt={image.id}
                  className={styles.ImageRight}
                />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ListingImages;
