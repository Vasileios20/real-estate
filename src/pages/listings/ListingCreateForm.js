import React, { useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";

import upload from "../../assets/upload.png";

import styles from "../../styles/ListingCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import { useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Asset from "../../components/Asset";
import { useRedirect } from "../../hooks/useRedirect";

function ListingCreateForm() {
  useRedirect("loggedOut");
  const [listingData, setListingData] = useState({
    type: "apartment",
    sale_type: "rent",
    description: "",
    address_number: "",
    address_street: "",
    postcode: "",
    city: "",
    price: "",
    surface: "",
    levels: "",
    bedrooms: "",
    floor: "",
    kitchens: "",
    bathrooms: "",
    living_rooms: "",
    heating_system: "",
    energy_class: "A",
    construction_year: "",
    availability: "",
    images: "",
    uploaded_images: [],
  });

  const {
    type,
    sale_type,
    description,
    address_number,
    address_street,
    postcode,
    city,
    price,
    surface,
    levels,
    bedrooms,
    floor,
    kitchens,
    bathrooms,
    living_rooms,
    heating_system,
    energy_class,
    construction_year,
    availability,
    images,
  } = listingData;
  const [errors, setErrors] = useState({});

  const imageInput = useRef(null);

  const history = useHistory();

  const handleChange = (e) => {
    setListingData({
      ...listingData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeImage = (e) => {
    if (e.target.files.length) {
      URL.revokeObjectURL(images);
      setListingData({
        ...listingData,
        images: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("type", type);
    formData.append("sale_type", sale_type);
    formData.append("description", description);
    formData.append("address_number", address_number);
    formData.append("address_street", address_street);
    formData.append("postcode", postcode);
    formData.append("city", city);
    formData.append("price", price);
    formData.append("surface", surface);
    formData.append("levels", levels);
    formData.append("bedrooms", bedrooms);
    formData.append("floor", floor);
    formData.append("kitchens", kitchens);
    formData.append("bathrooms", bathrooms);
    formData.append("living_rooms", living_rooms);
    formData.append("heating_system", heating_system);
    formData.append("energy_class", energy_class);
    formData.append("construction_year", construction_year);
    formData.append("availability", availability);
    formData.append("images", imageInput.current.files[0]);
    Array.from(imageInput.current.files).forEach((file) => {
      formData.append("uploaded_images", file);
    });
    console.log(formData.get("image"));

    try {
      const { data } = await axiosReq.post("/listings/", formData);
      history.push(`/listings/${data.id}`);
    } catch (err) {
      setErrors(err.response?.data);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const textFields = (
    <div className="text-center">
      <Row className="justify-content-center">
        <Col md={6}>
          <Form.Group controlId="sale_type">
            <Form.Label>Sale type</Form.Label>
            <Form.Control
              className={`${styles.Input}`}
              as="select"
              name="sale_type"
              value={sale_type}
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
              value={type}
              onChange={handleChange}
            >
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="land">Land</option>
              <option value="commercial">Commercial</option>
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
              value={description}
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
              className={styles.Input}
              name="address_number"
              value={address_number}
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
              value={address_street}
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
              value={postcode}
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
              value={city}
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
              type="text"
              name="price"
              value={price}
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
              type="text"
              name="surface"
              value={surface}
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
              type="text"
              name="levels"
              value={levels}
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
              type="text"
              name="bedrooms"
              value={bedrooms}
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
              type="text"
              name="floor"
              value={floor}
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
              type="text"
              name="kitchens"
              value={kitchens}
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
              type="text"
              name="bathrooms"
              value={bathrooms}
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
              type="text"
              name="living_rooms"
              value={living_rooms}
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
              value={heating_system}
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
              value={construction_year}
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
              value={energy_class}
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
              value={availability}
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

      <Button
        className={`${btnStyles.Button} ${btnStyles.Bright} mr-3`}
        onClick={() => history.goBack()}
      >
        Cancel
      </Button>
      <Button
        className={`${btnStyles.Button} ${btnStyles.Bright}`}
        type="submit"
      >
        Create
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0">
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center justify-content-between">
              {images ? (
                <>
                  {Array.from(imageInput.current.files).map((file, idx) => (
                    <figure key={idx}>
                      <Image
                        className={`"my-2 px-2" ${styles.Image}`}
                        src={URL.createObjectURL(file)}
                        rounded
                      />
                    </figure>
                  ))}

                  <div>
                    <Form.Label
                      className={`${btnStyles.Button} ${btnStyles.Bright} btn`}
                      htmlFor="image-upload"
                    >
                      Change the image
                    </Form.Label>
                  </div>
                </>
              ) : (
                <Form.Label
                  className="d-flex justify-content-center"
                  htmlFor="image-upload"
                >
                  <Asset
                    src={upload}
                    message="Click or tap to upload an image"
                  />
                </Form.Label>
              )}

              <Form.File
                multiple
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
                ref={imageInput}
              />
            </Form.Group>
            {errors?.images?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            {errors?.uploaded_images?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
      </Row>
      <Row>
        <Col md={12} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default ListingCreateForm;
