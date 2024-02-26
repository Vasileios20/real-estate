import React, { useState } from "react";
import styles from "../../styles/ListingImages.module.css";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Modal from "react-bootstrap/Modal";
import Carousel from "react-bootstrap/Carousel";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

const ListingImages = ({ images = [{}] }) => {
  // The ListingImages component is a functional component that renders the images of a listing.
  // It uses the Carousel component from react-bootstrap to display the images in a carousel.
  // The component also uses the Modal component from react-bootstrap to display the images in a modal when clicked.
  // The component takes an array of images as a prop and maps through the array to display the images in the carousel.
  // When an image is clicked, the modal is displayed with the images in a carousel.

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const nextIcon = (
    <i className={`fa-solid fa-arrow-right ${styles.NextIcon}`}> </i>
  );
  const prevIcon = (
    <i className={`fa-solid fa-arrow-left ${styles.PrevIcon}`}> </i>
  );
  const windowWidth = window.innerWidth;

  const renderTooltip = (props) => (
    <Tooltip
      id="button-tooltip"
      {...props}
      className={windowWidth < 769 ? "d-none" : "d-block"}
    >
      Click for larger view
    </Tooltip>
  );

  return (
    <Container>
      <Row>
        <Container style={{ height: "20vh" }}>
          <Row>
            <Col xs={12} md={6} lg={4} className="p-1 py-md-3 py-lg-0">
              <Carousel nextIcon={nextIcon} prevIcon={prevIcon}>
                {images.map((image, id) => (
                  <Carousel.Item key={id}>
                    <OverlayTrigger
                      placement="auto"
                      delay={{ show: 250, hide: 400 }}
                      overlay={renderTooltip}
                      trigger={["hover", "focus"]}
                    >
                      <Image
                        src={image.url}
                        alt={image.id}
                        fluid
                        className={styles.Image}
                        onClick={handleShow}
                      />
                    </OverlayTrigger>
                  </Carousel.Item>
                ))}
              </Carousel>
            </Col>
          </Row>
        </Container>
      </Row>
      <Modal
        show={show}
        onHide={handleClose}
        dialogClassName={styles.Modal}
        centered
        variant="dark"
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Row>
            <Container style={{ height: "80vh" }}>
              <Carousel nextIcon={nextIcon} prevIcon={prevIcon}>
                {images.map((image, id) => (
                  <Carousel.Item key={id}>
                    <Image
                      src={image.url}
                      alt={image.id}
                      fluid
                      className={styles.ImagesModal}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            </Container>
          </Row>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ListingImages;
