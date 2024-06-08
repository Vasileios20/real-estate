import React, { useRef, useState } from "react";

import Form from "react-bootstrap/Form";
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
import ListingTextFields from "../../components/ListingFormTextFields";
import useUserStatus from "../../hooks/useUserStatus";
import Forbidden403 from "../errors/Forbidden403";

function ListingCreateForm() {
  useRedirect("loggedOut");
  const userStatus = useUserStatus();
  const [listingData, setListingData] = useState({
    type: "",
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
    amenities: [],
  });

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
      URL.revokeObjectURL(listingData.images);
      setListingData({
        ...listingData,
        images: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(listingData).forEach((key) => {
      if (key === "uploaded_images") {
        Array.from(imageInput.current.files).forEach((file) => {
          formData.append("uploaded_images", file);
        });
      } else {
        formData.append(key, listingData[key]);
      }
    });

    try {
      const { data } = await axiosReq.post("/listings/", formData);
      history.push(`/listings/${data.id}`);
    } catch (err) {
      if (err.response?.status === 403) {
        history.push("/forbidden");
      } else {
        setErrors(err.response?.data);
      }
    }
  };

  if (userStatus === false) {
    return <Forbidden403 />;
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0">
          <Container className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}>
            <Form.Group className="text-center justify-content-between">
              {listingData.images ? (
                <>
                  {Array.from(imageInput.current.files).map((file, idx) => (
                    <figure key={idx}>
                      <Image className={`"my-2 px-2" ${styles.Image}`} src={URL.createObjectURL(file)} rounded />
                    </figure>
                  ))}

                  <div>
                    <Form.Label className={`${btnStyles.Button} ${btnStyles.Bright} btn`} htmlFor="image-upload">
                      Change the image
                    </Form.Label>
                  </div>
                </>
              ) : (
                <Form.Label className="d-flex justify-content-center" htmlFor="image-upload">
                  <Asset src={upload} message="Click or tap to upload an image" />
                </Form.Label>
              )}

              <input type="file" multiple id="image-upload" accept="image/*" onChange={handleChangeImage} ref={imageInput} />
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
              <ListingTextFields listingData={listingData} handleChange={handleChange} history={history} errors={errors} create={true} />
            </div>
          </Container>
        </Col>
      </Row>
      <Row>
        <Col md={12} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>
            <ListingTextFields listingData={listingData} handleChange={handleChange} history={history} errors={errors} create={true} />
          </Container>
        </Col>
      </Row>
    </Form>
  );
}

export default ListingCreateForm;
