import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import Container from "react-bootstrap/Container";

import { useHistory } from "react-router-dom";

import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import axios from "axios";

import { useCurrentUser } from "../../contexts/CurrentUserContext";

function ContactForm() {
  const currentUser = useCurrentUser();

  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const { name, email, subject, message } = contactData;

  const history = useHistory();

  useEffect(() => {
    if (currentUser) {
      setContactData({
        ...contactData,
        name: currentUser.username,
        email: currentUser.email,
      });
    }
    // if contactData is included in the dependency array,
    // the useEffect hook will run indefinitely
    // eslint-disable-next-line
  }, [currentUser, history]);

  const handleChange = (e) => {
    setContactData({
      ...contactData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/contact/", contactData);
      console.log(contactData);
      console.log(data);

      history.goBack();
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <Row className={styles.Row}>
      <Col className="m-auto" md={8}>
        <Container className={`${appStyles.Content} p-4 `}>
          <h1 className={styles.Header}>contact form</h1>
          <Form onSubmit={handleSubmit} className="d-flex flex-column">
            <Form.Group controlId="name">
              <Form.Label className="d-none">name</Form.Label>
              <Form.Control
                className={styles.Input}
                type="text"
                placeholder={"Name"}
                name="name"
                value={name}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.name?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <Form.Group controlId="email">
              <Form.Label className="d-none">email address</Form.Label>
              <Form.Control
                className={styles.Input}
                type="email"
                placeholder={"Email"}
                name="email"
                value={email}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.email?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <Form.Group controlId="subject">
              <Form.Label className="d-none">subject</Form.Label>
              <Form.Control
                className={styles.Input}
                type="text"
                placeholder="Subject"
                name="subject"
                value={subject}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.subject?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <Form.Group controlId="message">
              <Form.Label className="d-none">message</Form.Label>
              <Form.Control
                className={styles.Input}
                as="textarea"
                rows={6}
                placeholder="Message"
                name="message"
                value={message}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.message?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <Button
              className={`${btnStyles.Button} ${btnStyles.Black}`}
              type="submit"
            >
              Send
            </Button>
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
