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
    floor_area,
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
  const [selectedImages, setSelectedImages] = useState([]);

  useEffect(() => {
    // Fetch the listing data from the API.
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
        } = data;

        // Set the listing data state to the fetched data.
        setListingData({
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
        });
      } catch (err) {
        if (err.response.status === 403) {
          <Forbidden403 />;
        }
        // console.log(err);
      }
    };
    handleMount();
  }, [id, history]);

  // Function to handle the change event for the input fields.
  const handleChange = (e) => {
    setListingData({
      ...listingData,
      [e.target.name]: e.target.value,
    });
  };

  // Function to handle the change event for the image input field.
  const handleChangeImage = (e) => {
    if (e.target.files.length) {
      URL.revokeObjectURL(images);
      setListingData({
        ...listingData,
        image: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  // Function to handle the selected images to delete
  const handleSelectedImages = (e) => {
    // Get the checked checkboxes.
    const checkedBoxes = document.querySelectorAll(
      "input[name=images]:checked"
    );
    // If there are checked checkboxes, get their values and add them to the selected images state.
    if (checkedBoxes.length > 0) {
      const checkedValues = Array.from(checkedBoxes).map(
        (checkbox) => checkbox.value
      );

      setSelectedImages((prevSelectedImages) => {
        if (e.target.checked) {
          return [...prevSelectedImages, ...checkedValues];
        } else {
          return prevSelectedImages.filter(
            (image) => !checkedValues.includes(image)
          );
        }
      });
    } else {
      setSelectedImages([]);
    }
  };

  // Function to handle the delete image event.
  const handleDeleteImage = async (e) => {
    e.preventDefault();
    try {
      selectedImages.forEach(async (image) => {
        await axiosReq.delete(`/listings/${id}/images/${image}/`);

        setSelectedImages([]);
        window.location.reload();
      });
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  // Function to handle the submit event for the form.
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
    formData.append("surface", floor_area);
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
    formData.append("land_area", listingData.land_area);
    formData.append("wc", listingData.wc);


    formData.append("images", imageInput.current.files[0]);
    // Append the selected images to delete to the form data.
    if (imageInput.current.files.length > 0) {
      Array.from(imageInput.current.files).forEach((file) => {
        formData.append("uploaded_images", file);
      });
    } else {
      setErrors({ images: ["Please add an image"] });
    }

    try {
      // Send a PUT request to the API to edit the listing.
      const { data } = await axiosReq.put(`/listings/${id}/`, formData);
      // Redirect to the listing page for the edited listing.
      window.scrollTo(0, 0);
      window.localStorage.setItem("edited", true);
      history.push(`/listings/${data.id}`);
    } catch (err) {
      setErrors(err.response?.data);
      window.scrollTo(0, 0);
      if (err.response?.status === 403) {
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
                {Array.from(images).map((image) => (
                  <figure key={image.id}>
                    <input
                      type="checkbox"
                      name="images"
                      value={image.id}
                      id={image.url}
                      onChange={handleSelectedImages}
                    />
                    <Image
                      className={`"my-2 px-2" ${styles.Image}`}
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