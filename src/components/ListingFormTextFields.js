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
            <Form.Label>Floor Area</Form.Label>
            <Form.Control
              className={styles.Input}
              type="number"
              name="floor_area"
              value={listingData.floor_area}
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

      <Row className="justify-content-center">
        <Col md={6}>
          <Form.Group controlId="land_area">
            <Form.Label>Land Area</Form.Label>
            <Form.Control
              className={styles.Input}
              type="number"
              name="land_area"
              value={listingData.land_area}
              onChange={handleChange}
            />
          </Form.Group>
          {errors?.land_area?.map((message, idx) => (
            <Alert className={styles.Input} variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={6}>
          <Form.Group controlId="wc">
            <Form.Label>WC</Form.Label>
            <Form.Control
              className={styles.Input}
              type="number"
              name="wc"
              value={listingData.wc}
              onChange={handleChange}
            />
          </Form.Group>
          {errors?.wc?.map((message, idx) => (
            <Alert className={styles.Input} variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={6}>
          <Form.Group controlId="power_type">
            <Form.Label>Power Type</Form.Label>
            <Form.Control
              className={styles.Input}
              type="text"
              name="power_type"
              value={listingData.power_type}
              onChange={handleChange}
            />
          </Form.Group>
          {errors?.power_type?.map((message, idx) => (
            <Alert className={styles.Input} variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={6}>
          <Form.Group controlId="cover_coefficient">
            <Form.Label>Cover Coefficient</Form.Label>
            <Form.Control
              className={styles.Input}
              type="number"
              name="cover_coefficient"
              value={listingData.cover_coefficient}
              onChange={handleChange}
            />
          </Form.Group>
          {errors?.cover_coefficient?.map((message, idx) => (
            <Alert className={styles.Input} variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={6}>
          <Form.Group controlId="building_coefficient">
            <Form.Label>Building Coefficient</Form.Label>
            <Form.Control
              className={styles.Input}
              type="number"
              name="building_coefficient"
              value={listingData.building_coefficient}
              onChange={handleChange}
            />
          </Form.Group>
          {errors?.building_coefficient?.map((message, idx) => (
            <Alert className={styles.Input} variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={6}>
          <Form.Group controlId="opening_frames">
            <Form.Label>Opening Frames</Form.Label>
            <Form.Control
              className={styles.Input}
              as="select"
              name="opening_frames"
              value={listingData.opening_frames}
              onChange={handleChange}
            >
              <option value="aluminium">Aluminium</option>
              <option value="wooden">Wooden</option>
            </Form.Control>
          </Form.Group>
          {errors?.opening_frames?.map((message, idx) => (
            <Alert className={styles.Input} variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={6}>
          <Form.Group controlId="type_of_glass">
            <Form.Label>Type of Glass</Form.Label>
            <Form.Control
              className={styles.Input}
              as="select"
              name="type_of_glass"
              value={listingData.type_of_glass}
              onChange={handleChange}
            >
              <option value="single">Single</option>
              <option value="double">Double</option>
              <option value="triple">Triple</option>
            </Form.Control>
          </Form.Group>
          {errors?.type_of_glass?.map((message, idx) => (
            <Alert className={styles.Input} variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={6}>
          <Form.Group controlId="orientation">
            <Form.Label>Orientation</Form.Label>
            <Form.Control
              className={styles.Input}
              type="text"
              name="orientation"
              value={listingData.orientation}
              onChange={handleChange}
            />
          </Form.Group>
          {errors?.orientation?.map((message, idx) => (
            <Alert className={styles.Input} variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={6}>
          <Form.Group controlId="view">
            <Form.Label>View</Form.Label>
            <Form.Control
              className={styles.Input}
              type="text"
              name="view"
              value={listingData.view}
              onChange={handleChange}
            />
          </Form.Group>
          {errors?.view?.map((message, idx) => (
            <Alert className={styles.Input} variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={6}>
          <Form.Group controlId="slope">
            <Form.Label>Slope</Form.Label>
            <Form.Control
              className={styles.Input}
              type="text"
              name="slope"
              value={listingData.slope}
              onChange={handleChange}
            />
          </Form.Group>
          {errors?.slope?.map((message, idx) => (
            <Alert className={styles.Input} variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
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
