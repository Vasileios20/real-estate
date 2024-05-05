import React, { useState } from "react";
import styles from "../../styles/ListingImages.module.css";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Modal from "react-bootstrap/Modal";
import Carousel from "react-bootstrap/Carousel";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { Col } from "react-bootstrap";

const ListingImages = ({ images = [{}], listing_id }) => {
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
    <Container className="mb-4 ps-0">
      <OverlayTrigger
        placement="bottom"
        delay={{ show: 250, hide: 200 }}
        overlay={renderTooltip}
        trigger={["hover", "focus"]}
      >
        <Row className="gx-1">
          {/* <Carousel nextIcon={nextIcon} prevIcon={prevIcon}>
          {images.map((image, id) => (
            <Carousel.Item key={id}>
              <OverlayTrigger
                placement="bottom"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip}
                trigger={["hover", "focus"]}
              >
                <div className={styles.ImageWrapper}>
                  <img
                    src={image.url}
                    alt={image.id}
                    className={styles.Image}
                    onClick={handleShow}
                  />
                </div>
              </OverlayTrigger>
            </Carousel.Item>
          ))}
        </Carousel> */}

          <Col xs={12} md={6} className="">
            <div className={styles.ImageWrapper}>
              <img
                src={images[0]?.url}
                alt={images[0]?.id}
                className={`img-fluid ${styles.Image}`}
                onClick={handleShow}
              />
            </div>
          </Col>
          <Col>
            <Row className="justify-content-start d-none d-md-flex gx-1">
              {/* Map the images and Display 4 images , 2 on top 2 bellow */}

              {images?.slice(-4).map((image, id) => (
                <Col key={id} xs={6} md={6} lg={6} xl={6} style={{ paddingBottom: "3px" }}>
                  <div className={styles.ImageWrapper}>
                    <img
                      src={image.url}
                      alt={image.id}
                      className={`img-fluid ${styles.Image}`}
                      onClick={handleShow}
                    />
                  </div>
                </Col>
              ))}


            </Row>
          </Col>


        </Row>
      </OverlayTrigger>
      <Modal
        show={show}
        onHide={handleClose}
        dialogClassName={`${styles.Modal}`}
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Row>

            <Carousel nextIcon={nextIcon} prevIcon={prevIcon}>
              {images.map((image, id) => (
                <Carousel.Item key={id}>
                  <div className={styles.ModalImageWrapper}>
                    <Image
                      src={image.url}
                      alt={image.id}
                      fluid
                      className={styles.ImagesModal}
                    />
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>

          </Row>
        </Modal.Body>
      </Modal>
    </Container >
  );
};

export default ListingImages;
