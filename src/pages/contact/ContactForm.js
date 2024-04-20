import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import Container from "react-bootstrap/Container";

import { useHistory, useLocation } from "react-router-dom";

import styles from "../../styles/ContactForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import axios from "axios";

import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosReq } from "../../api/axiosDefaults";
import { use } from "i18next";
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

function ContactForm({ listing_id }) {
  /**
   * The ContactForm component is a functional component that renders a form for sending a message to the site admin.
   * It contains input fields for the name, email, subject, and message of the contact form.
   * It also contains a submit button that sends a request to the API to send the message.
   * @returns {JSX.Element} - The JSX for the component.
   */

  const currentUser = useCurrentUser();
  const id = currentUser?.profile_id;

  const [contactData, setContactData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const { first_name, last_name, phone_number, email, subject, message } = contactData;
  const [success, setSuccess] = useState(false);
  const [messageDeleted, setMessageDeleted] = useState(false);

  const history = useHistory();

  const message_form = `I am interested in the listing with id ${listing_id}`;
  const path = useLocation().pathname;

  const [value, setValue] = useState();



  // Phone number gets the value to pass it to contactData



  contactData.message =
    path === `/listings/${listing_id}` && !messageDeleted
      ? message_form
      : contactData.message;

  // useEffect(() => {
  //   if (currentUser) {
  //     // If the current user exists, fetch the user profile data.
  //     const fetchProfileData = async () => {
  //       try {
  //         const { data } = await axiosReq.get(`/profiles/${id}/`);
  //         // Set the contactData state with the user's name and email address.
  //         setContactData({
  //           ...contactData,
  //           first_name: currentUser.username,
  //           email: data.email_address,
  //         });
  //       } catch (err) {
  //         // console.log(err);
  //       }
  //     };
  //     fetchProfileData();
  //   }
  //   // if contactData is included in the dependency array,
  //   // the useEffect hook will run indefinitely
  //   // eslint-disable-next-line
  // }, [id, history]);

  const handleChange = (e) => {
    setContactData({
      ...contactData,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "message") {
      setMessageDeleted(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    contactData.phone_number = value;
    try {
      await axios.post("/contact/", contactData);
      setSuccess(true);

      setTimeout(() => {
        path === `/listings/${listing_id}`
          ? window.location.reload()
          : history.push("/");
      }, 2000);
    } catch (err) {
      setErrors(err.response?.data);
      console.log(err.response?.data);
      setTimeout(() => {
        setErrors({});
      }, 2500);
    }
  };

  return (
    <Row>
      <Col
        className={
          path === `/listings/${listing_id}` ? "m-auto pt-0 mt-0" : `m-auto`
        }
        md={path === `/listings/${listing_id}` ? 12 : 4}

      >
        <Container className={`${appStyles.Content} p-4 rounded shadow`}>
          <h1 className={styles.Header}>contact form</h1>
          <Form
            onSubmit={handleSubmit}
            className={`d-flex flex-column ${styles.ContactForm}`}
          >
            <Form.Group controlId="first_name" className="">
              <Form.Label className={styles.FormLabel}>
                First Name<span>* {errors.first_name?.map((message, idx) => (
                  <span className={styles.ErrorMessage} key={idx}>
                    {message}
                  </span>
                ))}</span>
              </Form.Label>
              <Form.Control
                className={`${styles.Input} text-start`}
                type="text"
                placeholder={"Your first name"}
                name="first_name"
                value={first_name}
                onChange={handleChange}
                disabled={success ? true : false}
              />
            </Form.Group>


            <Form.Group controlId="last_name">
              <Form.Label className={styles.FormLabel}>
                Last Name<span>* {errors.last_name?.map((message, idx) => (
                  <span className={styles.ErrorMessage} key={idx}>
                    {message}
                  </span>
                ))}</span>
              </Form.Label>
              <Form.Control
                className={`${styles.Input} text-start`}
                type="text"
                placeholder={"Your last name"}
                name="last_name"
                value={last_name}
                onChange={handleChange}
                disabled={success ? true : false}
              />
            </Form.Group>


            <Form.Group controlId="email">
              <Form.Label className={styles.FormLabel}>
                Email<span>* {errors.email?.map((message, idx) => (
                  <span className={styles.ErrorMessage} key={idx}>
                    {message}
                  </span>
                ))}</span>
              </Form.Label>
              <Form.Control
                className={`${styles.Input} text-start`}
                type="email"
                placeholder={"Your email"}
                name="email"
                value={email}
                onChange={handleChange}
                disabled={success ? true : false}
              />
            </Form.Group>

            <Form.Group controlId="phone_number">
              <Form.Label className={styles.FormLabel}>Phone Number<span>* {errors.phone_number?.map((message, idx) => (
                <span className={styles.ErrorMessage} key={idx}>
                  {message}
                </span>
              ))}</span></Form.Label>
              {/* <Form.Control
                className={`${styles.Input} text-start`}
                type="text"
                placeholder={"Your phone number"}
                name="phone_number"
                value={phone_number}
                onChange={handleChange}
                disabled={success ? true : false}
              /> */}
              <PhoneInput
                style={{ paddingLeft: "0.3rem" }}
                className={`${styles.Input} text-start`}
                international
                defaultCountry="GR"
                placeholder="Enter phone number"
                value={value}
                onChange={setValue}
                inputComponent={Form.Control}
                containerComponent={Form.Group}
                disabled={success ? true : false} />
            </Form.Group>


            <Form.Group controlId="subject">
              <Form.Label className={styles.FormLabel}>
                Subject<span>* {errors.subject?.map((message, idx) => (
                  <span className={styles.ErrorMessage} key={idx}>
                    {message}
                  </span>
                ))}</span>
              </Form.Label>
              <Form.Control
                className={`${styles.Input} text-start`}
                type="text"
                placeholder="Subject"
                name="subject"
                value={subject}
                onChange={handleChange}
                disabled={success ? true : false}
              />
            </Form.Group>


            <Form.Group controlId="message">
              <Form.Label className={styles.FormLabel}>
                Message<span>* {errors.message?.map((message, idx) => (
                  <span className={styles.ErrorMessage} key={idx}>
                    {message}
                  </span>
                ))}</span>
              </Form.Label>
              <Form.Control
                className={`${styles.Input} text-start`}
                as="textarea"
                rows={6}
                placeholder={
                  path === `/listings/${listing_id}` && !messageDeleted
                    ? message_form
                    : "Your message"
                }
                name="message"
                value={message}
                onChange={handleChange}
                disabled={success ? true : false}
              />
            </Form.Group>


            <Button
              className={`${btnStyles.Button} ${btnStyles.Black} mt-3`}
              type="submit"
            >
              Send
            </Button>
            {success && (
              <Alert variant="success" className="mt-3">
                Message sent successfully!
              </Alert>
            )}
            {errors.non_field_errors?.map((message, idx) => (
              <Alert variant="warning" key={idx} className="mt-3">
                {message}
              </Alert>
            ))}
          </Form>
        </Container>
      </Col>
    </Row>
  );
}

export default ContactForm;
