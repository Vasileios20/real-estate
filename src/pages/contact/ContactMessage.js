import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const ContactMessage = () => {
  const [message, setMessage] = useState("");
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const { data } = await axiosReq.get(`/contact_list/${id}/`);
        setMessage(data);
      } catch (err) {
        console.log(err);
        if (err.response.status === 403) {
          history.push("/forbidden");
        }
      }
    };

    fetchMessage();
  }, [history, id]);

  return (
    <Row>
      <Col>
        <h1>Contact Message</h1>
        <p>From: {message.name}</p>
        <p>Email address: {message.email}</p>
        <p>Subject: {message.subject}</p>
        <p>Message:</p>
        <p>{message.message}</p>
      </Col>
    </Row>
  );
};

export default ContactMessage;
