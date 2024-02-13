import { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import btnStyles from "../../styles/Button.module.css";
import { Link, useHistory } from "react-router-dom";
import { Table } from "react-bootstrap";

const ContactMessagesList = () => {
  const [contactList, setContactList] = useState([]);
  const [query, setQuery] = useState("");
  const [created_at, setCreated_at] = useState({ min: "", max: "" });
  const history = useHistory();

  useEffect(() => {
    const fetchContactList = async () => {
      try {
        const { data } = await axiosReq.get("/contact_list");
        setContactList(data.results);
      } catch (err) {
        console.log(err);
        if (err.response.status === 403) {
          history.push("/forbidden");
        }
      }
    };
    fetchContactList();
  }, [history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let path = `/contact_list/?`;
    if (query) {
      path += `&search=${query}`;
    }
    if (created_at.min) {
      path += `&min_created_at=${created_at.min}`;
    }
    if (created_at.max) {
      path += `&max_created_at=${created_at.max}`;
    }
    try {
      const { data } = await axiosReq.get(`${path}`);
      setContactList(data.results);
    } catch (err) {
      console.log(err);
      if (err.response.status === 403) {
        history.push("/forbidden");
      }
    }
  };

  return (
    <>
      <Form
        className={`d-flex flex-row justify-content-around align-items-center border p-4 bg-light mt-5`}
        onSubmit={handleSubmit}
      >
        <Row>
          <Col className="col-sm-12 col-md-6 mt-auto">
            <Form.Control
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="name, email or subject"
            />
          </Col>

          <Col className="col-12 col-md-3">
            <Form.Label>Date from</Form.Label>
            <Form.Control
              type="date"
              placeholder="Min"
              min="0"
              value={created_at.min}
              onChange={(e) =>
                setCreated_at({ ...created_at, min: e.target.value })
              }
            />
          </Col>

          <Col className="col-12 col-md-3">
            <Form.Label>Date to</Form.Label>
            <Form.Control
              type="date"
              placeholder="Max"
              max="10000000"
              value={created_at.max}
              onChange={(e) =>
                setCreated_at({ ...created_at, max: e.target.value })
              }
            />
          </Col>

          <Col className="col-12">
            <Button
              className={`${btnStyles.Button} ${btnStyles.Bright} mt-2`}
              type="submit"
            >
              Search
            </Button>
          </Col>
        </Row>
      </Form>

      <Row>
        <Col className="text-center mt-2">
          <h1>Messages</h1>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col>
          <Table responsive>
            <thead>
              <tr>
                <th>Sender</th>
                <th>Email</th>
                <th>Subject</th>
                <th>Message</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {contactList.map((contact, idx) => (
                <tr key={idx}>
                  <td>
                    <Link to={`/contact_list/${contact.id}`}>
                      {contact.name}
                    </Link>
                  </td>
                  <td>
                    <Link to={`/contact_list/${contact.id}`}>
                      {contact.email}
                    </Link>
                  </td>
                  <td>
                    <Link to={`/contact_list/${contact.id}`}>
                      {contact.subject.slice(0, 30)}
                    </Link>
                  </td>
                  <td>
                    <Link to={`/contact_list/${contact.id}`}>
                      {contact.message.slice(0, 30)}...
                    </Link>
                  </td>
                  <td>
                    <Link to={`/contact_list/${contact.id}`}>
                      {contact.created_at}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </>
  );
};

export default ContactMessagesList;
