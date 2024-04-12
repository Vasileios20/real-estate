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
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const { name, email, subject, message } = contactData;
  const [success, setSuccess] = useState(false);
  const [messageDeleted, setMessageDeleted] = useState(false);

  const history = useHistory();

  const message_form = `I am interested in the listing with id ${listing_id}`;
  const path = useLocation().pathname;

  contactData.message =
    path === `/listings/${listing_id}` && !messageDeleted
      ? message_form
      : contactData.message;

  useEffect(() => {
    if (currentUser) {
      // If the current user exists, fetch the user profile data.
      const fetchProfileData = async () => {
        try {
          const { data } = await axiosReq.get(`/profiles/${id}/`);
          // Set the contactData state with the user's name and email address.
          setContactData({
            ...contactData,
            name: currentUser.username,
            email: data.email_address,
          });
        } catch (err) {
          // console.log(err);
        }
      };
      fetchProfileData();
    }
    // if contactData is included in the dependency array,
    // the useEffect hook will run indefinitely
    // eslint-disable-next-line
  }, [id, history]);

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
      setTimeout(() => {
        setErrors({});
      }, 2500);
    }
  };

  return (
    <Row className="mt-4">
      <Col
        className={path === `/listings/${listing_id}` ? "m-auto" : "m-auto"}
        md={path === `/listings/${listing_id}` ? 12 : 8}
      >
        <Container className={`${appStyles.Content} p-4 rounded shadow`}>
          <h1 className={styles.Header}>contact form</h1>
          <Form onSubmit={handleSubmit} className="d-flex flex-column">
            <Form.Group controlId="name" className="">
              <Form.Label className={styles.FormLabel}>
                Name<span>*</span>
              </Form.Label>
              <Form.Control
                className={`${styles.Input} text-start`}
                type="text"
                placeholder={"Your full name"}
                name="name"
                value={name}
                onChange={handleChange}
                disabled={success ? true : false}
              />
            </Form.Group>
            {errors.name?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <Form.Group controlId="email">
              <Form.Label className={styles.FormLabel}>
                Email<span>*</span>
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
            {errors.email?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <Form.Group controlId="subject">
              <Form.Label className={styles.FormLabel}>
                Subject<span>*</span>
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
            {errors.subject?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <Form.Group controlId="message">
              <Form.Label className={styles.FormLabel}>
                Message<span>*</span>
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
            {errors.message?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

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
