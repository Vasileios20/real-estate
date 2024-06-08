import React from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";

import styles from "../styles/ListingCreateEditForm.module.css";
import btnStyles from "../styles/Button.module.css";

/**
   * This component is used to render the text fields of the listing form.
   * It receives the following props:
   * - listingData: object
   * - handleChange: function
   * - history: object
   * - errors: object
   * - create: boolean
   */
const ListingTextFields = ({ listingData, handleChange, history, errors, create }
) => {

  return (
    <div className="text-center">
      <Row className="justify-content-center">
        <Col md={6}>
          <Form.Group controlId="sale_type">
            <Form.Label>Sale type</Form.Label>
            <Form.Control
              className={`${styles.Input}`}
              as="select"
              name="sale_type"
              value={listingData.sale_type}
              onChange={handleChange}
            >
              <option value="rent">Rent</option>
              <option value="sale">Sale</option>
            </Form.Control>
          </Form.Group>
          {errors?.sale_type?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={6}>
          <Form.Group controlId="type">
            <Form.Label>Property type</Form.Label>
            <Form.Control
              className={styles.Input}
              as="select"
              name="type"
              value={listingData.type}
              onChange={handleChange}
            >

              <option value="land">Land</option>
              <option value="commercial">Commercial</option>
              <option value="residential">Residential</option>
            </Form.Control>
          </Form.Group>
          {errors?.type?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={6}>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              className={styles.Input}
              as="textarea"
              rows={6}
              name="description"
              value={listingData.description}
              onChange={handleChange}
            />
          </Form.Group>
          {errors?.description?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={6}>
          <Form.Group controlId="address_number">
            <Form.Label>Address number</Form.Label>
            <Form.Control
              type="number"
              className={styles.Input}
              name="address_number"
              value={listingData.address_number}
              onChange={handleChange}
            />
          </Form.Group>
          {errors?.address_number?.map((message, idx) => (
            <Alert className={styles.Input} variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={6}>
          <Form.Group controlId="address_street">
            <Form.Label>Address Street</Form.Label>
            <Form.Control
              className={styles.Input}
              type="text"
              name="address_street"
              value={listingData.address_street}
              onChange={handleChange}
            />
          </Form.Group>
          {errors?.address_street?.map((message, idx) => (
            <Alert className={styles.Input} variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={6}>
          <Form.Group controlId="postcode">
            <Form.Label>Postcode</Form.Label>
            <Form.Control
              className={styles.Input}
              type="text"
              name="postcode"
              value={listingData.postcode}
              onChange={handleChange}
            />
          </Form.Group>
          {errors?.postcode?.map((message, idx) => (
            <Alert className={styles.Input} variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={6}>
          <Form.Group controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              className={styles.Input}
              type="text"
              name="city"
              value={listingData.city}
              onChange={handleChange}
            />
          </Form.Group>
          {errors?.city?.map((message, idx) => (
            <Alert className={styles.Input} variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={6}>
          <Form.Group controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              className={styles.Input}
              type="number"
              name="price"
              value={listingData.price}
              onChange={handleChange}
            />
          </Form.Group>
          {errors?.price?.map((message, idx) => (
            <Alert className={styles.Input} variant="warning" key={idx}>
              {message}
            </Alert>
          ))}

          <Form.Group controlId="surface">
            <Form.Label>Surface</Form.Label>
            <Form.Control
              className={styles.Input}
              type="number"
              name="surface"
              value={listingData.surface}
              onChange={handleChange}
            />
          </Form.Group>
          {errors?.surface?.map((message, idx) => (
            <Alert className={styles.Input} variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={6}>
          <Form.Group controlId="levels">
            <Form.Label>Levels</Form.Label>
            <Form.Control
              className={styles.Input}
              type="number"
              name="levels"
              value={listingData.levels}
              onChange={handleChange}
            />
          </Form.Group>
          {errors?.levels?.map((message, idx) => (
            <Alert className={styles.Input} variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={6}>
          <Form.Group controlId="bedrooms">
            <Form.Label>Bedrooms</Form.Label>
            <Form.Control
              className={styles.Input}
              type="number"
              name="bedrooms"
              value={listingData.bedrooms}
              onChange={handleChange}
            />
          </Form.Group>
          {errors?.bedrooms?.map((message, idx) => (
            <Alert className={styles.Input} variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={6}>
          <Form.Group controlId="floor">
            <Form.Label>Floor</Form.Label>
            <Form.Control
              className={styles.Input}
              type="number"
              name="floor"
              value={listingData.floor}
              onChange={handleChange}
            />
          </Form.Group>
          {errors?.floor?.map((message, idx) => (
            <Alert className={styles.Input} variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={6}>
          <Form.Group controlId="kitchens">
            <Form.Label>Kitchens</Form.Label>
            <Form.Control
              className={styles.Input}
              type="number"
              name="kitchens"
              value={listingData.kitchens}
              onChange={handleChange}
            />
          </Form.Group>
          {errors?.kitchens?.map((message, idx) => (
            <Alert className={styles.Input} variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={6}>
          <Form.Group controlId="bathrooms">
            <Form.Label>Bathrooms</Form.Label>
            <Form.Control
              className={styles.Input}
              type="number"
              name="bathrooms"
              value={listingData.bathrooms}
              onChange={handleChange}
            />
          </Form.Group>
          {errors?.bathrooms?.map((message, idx) => (
            <Alert className={styles.Input} variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={6}>
          <Form.Group controlId="living_rooms">
            <Form.Label>Living Rooms</Form.Label>
            <Form.Control
              className={styles.Input}
              type="number"
              name="living_rooms"
              value={listingData.living_rooms}
              onChange={handleChange}
            />
          </Form.Group>
          {errors?.living_rooms?.map((message, idx) => (
            <Alert className={styles.Input} variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={6}>
          <Form.Group controlId="heating_system">
            <Form.Label>Heating System</Form.Label>
            <Form.Control
              className={styles.Input}
              type="text"
              name="heating_system"
              value={listingData.heating_system}
              onChange={handleChange}
            />
          </Form.Group>
          {errors?.heating_system?.map((message, idx) => (
            <Alert className={styles.Input} variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={6}>
          <Form.Group controlId="construction_year">
            <Form.Label>Construction Year</Form.Label>
            <Form.Control
              className={styles.Input}
              as="select"
              name="construction_year"
              value={listingData.construction_year}
              onChange={handleChange}
            >
              {Array.from(
                { length: new Date().getFullYear() - 1899 },
                (_, i) => i + 1900
              ).map((year) => (
                <option key={year}>{year}</option>
              ))}
            </Form.Control>
          </Form.Group>
          {errors?.construction_year?.map((message, idx) => (
            <Alert className={styles.Input} variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={6}>
          <Form.Group controlId="energy_class">
            <Form.Label>Energy class</Form.Label>
            <Form.Control
              className={styles.Input}
              as="select"
              name="energy_class"
              value={listingData.energy_class}
              onChange={handleChange}
            >
              {Array.from("ABCDEFG").map((letter) => (
                <option key={letter}>{letter}</option>
              ))}
            </Form.Control>
          </Form.Group>
          {errors?.energy_class?.map((message, idx) => (
            <Alert className={styles.Input} variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={6}>
          <Form.Group controlId="availability">
            <Form.Label>Availability</Form.Label>
            <Form.Control
              className={styles.Input}
              type="date"
              name="availability"
              value={listingData.availability}
              onChange={handleChange}
            />
          </Form.Group>
          {errors?.availability?.map((message, idx) => (
            <Alert className={styles.Input} variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={6}>
          <Form.Group controlId="latitude">
            <Form.Label>Latitude</Form.Label>
            <Form.Control
              className={styles.Input}
              type="decimal"
              name="latitude"
              value={listingData.latitude}
              onChange={handleChange}
            />

            {errors?.latitude?.map((message, idx) => (
              <Alert className={styles.Input} variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
          </Form.Group>

          <Form.Group controlId="longitude">
            <Form.Label>Longitude</Form.Label>
            <Form.Control
              className={styles.Input}
              type="decimal"
              name="longitude"
              value={listingData.longitude}
              onChange={handleChange}
            />
            {errors?.longitude?.map((message, idx) => (
              <Alert className={styles.Input} variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
          </Form.Group>
        </Col>
      </Row>

      <Button
        className={`${btnStyles.Button} ${btnStyles.Remove} m-3`}
        onClick={() => history.goBack()}
      >
        Cancel
      </Button>
      <Button
        className={`${btnStyles.Button} ${btnStyles.Black} m-3`}
        type="submit"
      >
        {create ? "Create" : "Update"}
      </Button>
    </div>

  );


};

export default ListingTextFields;
