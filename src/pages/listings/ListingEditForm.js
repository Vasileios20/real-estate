import React, { useEffect, useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";

import styles from "../../styles/ListingCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import { useHistory, useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { useRedirect } from "../../hooks/useRedirect";
import ListingTextFields from "../../components/ListingTextFields";
import useUserStatus from "../../hooks/useUserStatus";
import Forbidden403 from "../../components/Forbidden403";

function ListingEditForm() {
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
  const { id } = useParams();
  const userStatus = useUserStatus();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/listings/${id}/`);
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
          uploaded_images,
          is_owner,
        } = data;

        is_owner
          ? setListingData({
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
              uploaded_images,
            })
          : history.push(`/listings/${id}/`);
      } catch (err) {
        if (err.response.status === 403) {
          <Forbidden403 />;
        }
        console.log(err);
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
      URL.revokeObjectURL(images);
      setListingData({
        ...listingData,
        image: URL.createObjectURL(e.target.files[0]),
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

    try {
      const { data } = await axiosReq.put(`/listings/${id}/`, formData);
      history.push(`/listings/${data.id}`);
    } catch (err) {
      setErrors(err.response?.data);
      if (err.response?.status === 403) {
        setErrors(err.response?.data);
      }
    }
  };

  return (
    <>
      {userStatus === false ? (
        <Forbidden403 />
      ) : (
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col className="py-2 p-0">
              <Container
                className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
              >
                <Form.Group className="text-center justify-content-between">
                  <>
                    <Alert
                      variant="danger"
                      className={`${btnStyles.Medium} mx-auto`}
                    >
                      All the old images will be deleted
                    </Alert>
                    {Array.from(images).map((image, idx) => (
                      <figure key={idx}>
                        <Image
                          className={`"my-2 px-2" ${styles.Image}`}
                          src={image.url}
                          rounded
                        />
                      </figure>
                    ))}
                  </>
                  <>
                    {images
                      ? Array.from(imageInput.current.files).map(
                          (file, idx) => (
                            <figure key={idx}>
                              <Image
                                className={`"my-2 px-2" ${styles.Image}`}
                                src={URL.createObjectURL(file)}
                                rounded
                              />
                            </figure>
                          )
                        )
                      : null}

                    <div>
                      <Form.Label
                        className={`${btnStyles.Button} ${btnStyles.Bright} btn`}
                        htmlFor="image-upload"
                      >
                        Change the image
                      </Form.Label>
                    </div>
                  </>

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

                <div className="d-md-none">
                  <ListingTextFields
                    listingData={listingData}
                    handleChange={handleChange}
                    history={history}
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
                  history={history}
                  errors={errors}
                />
              </Container>
            </Col>
          </Row>
        </Form>
      )}
    </>
  );
}

export default ListingEditForm;
