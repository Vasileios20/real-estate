import React, { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";

import styles from "../../styles/ListingCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import { useRedirect } from "../../hooks/useRedirect";
import ListingTextFields from "../../components/ListingFormTextFields";
import useUserStatus from "../../hooks/useUserStatus";
import Forbidden403 from "../errors/Forbidden403";
import upload from "../../assets/upload.png";
import Asset from "../../components/Asset";

function ListingEditForm() {
  useRedirect("loggedOut");

  const [listingData, setListingData] = useState({
    type: "",
    sale_type: "",
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
    images: [],
    uploaded_images: [],
    latitude: "",
    longitude: "",
    amenities: [],
  });

  const [errors, setErrors] = useState({});
  const imageInput = useRef(null);
  const history = useHistory();
  const { id } = useParams();
  const userStatus = useUserStatus();
  const [selectedImages, setSelectedImages] = useState([]);

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/listings/${id}/`);
        setListingData(data);
      } catch (err) {
        if (err.response.status === 403) {
          history.push("/403");
        } else {
          setErrors(err.response?.data);
        }
      }
    };
    handleMount();
  }, [id, history]);

  const handleChange = (e) => {
    setListingData({
      ...listingData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeImage = (e) => {
    if (e.target.files.length) {
      URL.revokeObjectURL(listingData.images);
      setListingData({
        ...listingData,
        images: [...listingData.images, URL.createObjectURL(e.target.files[0])],
      });
    }
  };

  const handleSelectedImages = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setSelectedImages([...selectedImages, value]);
    } else {
      setSelectedImages(selectedImages.filter((image) => image !== value));
    }
  };

  const handleDeleteImage = async (e) => {
    e.preventDefault();
    try {
      await Promise.all(
        selectedImages.map((imageId) =>
          axiosReq.delete(`/listings/${id}/images/${imageId}/`)
        )
      );
      setSelectedImages([]);
      window.location.reload();
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.entries(listingData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => formData.append(key, item));
      } else {
        formData.append(key, value);
      }
    });

    if (imageInput.current.files.length > 0) {
      Array.from(imageInput.current.files).forEach((file) => {
        formData.append("uploaded_images", file);
      });
    }

    try {
      const { data } = await axiosReq.put(`/listings/${id}/`, formData);
      history.push(`/listings/${data.id}`);
    } catch (err) {
      setErrors(err.response?.data);
      window.scrollTo(0, 0);
    }
  };

  if (userStatus === false) {
    return <Forbidden403 />;
  }

  return (

    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0">
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center justify-content-between">
              <Alert
                variant="danger"
                className={`${btnStyles.Wide} mx-auto`}
              >
                To delete images choose the ones you would like to delete
                and press the button below
              </Alert>
              <div>
                {listingData.images.map((image, idx) => (
                  <figure key={idx}>
                    <input
                      type="checkbox"
                      name="images"
                      value={image.id}
                      onChange={handleSelectedImages}
                    />
                    <Image
                      className={`my-2 px-2 ${styles.Image}`}
                      src={image.url}
                      rounded
                    />
                  </figure>
                ))}
              </div>
              <button
                className={`${btnStyles.Button} ${btnStyles.Remove} mb-1`}
                onClick={handleDeleteImage}
              >
                Delete selected image(s)
              </button>
              <div>
                {imageInput.current &&
                  Array.from(imageInput.current.files).map((file, idx) => (
                    <figure key={idx}>
                      <Image
                        className={`my-2 px-2 ${styles.Image}`}
                        src={URL.createObjectURL(file)}
                        rounded
                      />
                    </figure>
                  ))}
                <Form.Label
                  htmlFor="image-upload"
                  className={styles.ImageUpload}
                >
                  <Asset src={upload} message="Click or tap to upload an image" />
                </Form.Label>
              </div>
              <input
                type="file"
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
            <div className="d-md-none">
              <ListingTextFields
                listingData={listingData}
                handleChange={handleChange}
                errors={errors}
              />
            </div>
          </Container>
        </Col>
      </Row>
      <Row>
        <Col md={12} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>
            <ListingTextFields
              listingData={listingData}
              handleChange={handleChange}
              errors={errors}
            />
          </Container>
        </Col>
      </Row>
    </Form>
  );
}

export default ListingEditForm;