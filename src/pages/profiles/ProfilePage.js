import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";

import { useParams } from "react-router";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosReq } from "../../api/axiosDefaults";
import { ProfileEditDropdown } from "../../components/MoreDropDown";
import { useRedirect } from "../../hooks/useRedirect";

function ProfilePage() {
  useRedirect("loggedOut");
  const { id } = useParams();
  const currentUser = useCurrentUser();
  const [profileData, setProfileData] = useState({
    id: "",
    owner: "",
    first_name: "",
    last_name: "",
    email_address: "",
    image: "",
    phone: "",
    created_at: "",
    updated_at: "",
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const { data } = await axiosReq.get(`/profiles/${id}/`);
        setProfileData(data);
      } catch (err) {
        console.log(err);
        if (err.response.status === 401) {
          console.log("Unauthorized");
        }
      }
    };
    fetchProfileData();
  }, [id]);

  return (
    currentUser && (
      <Container>
        <Row>
          <Col className="my-2">
            <Card className="my-2">
              <Card.Header>
                <h1>{profileData.owner}'s Profile Page</h1>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={4}>
                    <Image
                      src={profileData.image}
                      alt={profileData.owner}
                      rounded
                      fluid
                    />
                  </Col>
                  <Col md={8}>
                    <Card.Title>
                      {profileData.first_name} {profileData.last_name}
                    </Card.Title>
                    <Card.Text>
                      <p>Email: {profileData.email_address}</p>
                      <p>Phone: {profileData.phone}</p>
                      <p>Joined at: {profileData.created_at}</p>
                      <p>Updated at: {profileData.updated_at}</p>
                    </Card.Text>
                  </Col>
                </Row>
              </Card.Body>
              {currentUser.username === profileData.owner && (
                <ProfileEditDropdown />
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    )
  );
}

export default ProfilePage;
