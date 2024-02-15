import React, { useState } from "react";
import styles from "../../styles/ListingImages.module.css";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Modal from "react-bootstrap/Modal";

const ListingImages = ({ images = [{}] }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Container>
      <Row>
        <Col md={6} className="p-0 pr-1">
          <Image
            className={styles.ImageLeft}
            src={images[0].url}
            alt={images[0].id}
            onClick={handleShow}
            rounded
            style={{ aspectRatio: "16/9" }}
          />
        </Col>
        <Col md={6} className="p-0">
          <Row>
            {images.slice(1, 5).map((image) => (
              <Col md={6} key={image.id}>
                <Image
                  src={image.url}
                  alt={image.id}
                  className={styles.ImageRight}
                  onClick={handleShow}
                  rounded
                  style={{ aspectRatio: "16/9" }}
                />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
      <Modal show={show} onHide={handleClose} dialogClassName={styles.Modal}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <>
            <Row className="justify-content-center px-3">
              {images.map((image, id) => (
                <Image
                  key={id}
                  src={image.url}
                  alt={image.id}
                  fluid
                  className={styles.ImagesModal}
                />
              ))}
            </Row>
          </>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ListingImages;
