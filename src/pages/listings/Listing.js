import React from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

import styles from "../../styles/Listing.module.css";
import btnStyles from "../../styles/Button.module.css";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";

import { Link } from "react-router-dom";
import ListingImages from "./ListingImages";

const Listing = (props) => {
  const {
    id,
    owner,
    profile_id,
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
    created_at,
    updated_at,
    listingPage,
    images,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const loggedOut = currentUser === null;

  return (
    <Row className={styles.Listing}>
      <ListingImages images={images} id={id} />
      <Col md={8}>
        <h4 style={{ textTransform: "capitalize" }}>
          {type} to {sale_type}
        </h4>
        <div className={styles.Listing__fontawsome}>
          <p>
            <i class="fa-solid fa-bed"> {bedrooms}</i>
          </p>
          <p>
            <i class="fa-solid fa-bath"> {bathrooms}</i>
          </p>
          <p>
            <i class="fa-solid fa-stairs"> {floor}</i>
          </p>
        </div>
        <h5>Description</h5>
        <p>{description}</p>
        <h6>Address: </h6>{" "}
        <p>
          {address_number}, {address_street}, {postcode}, {city}
        </p>
      </Col>

      <Col md={5}>
        <h5>Features</h5>
        <Table className={styles.Listing__table}>
          <tbody>
            <tr>
              <td>Price</td>
              <td>£ {price}</td>
            </tr>
            <tr>
              <td>Surface</td>
              <td>
                {surface} m<sup>2</sup>
              </td>
            </tr>
            <tr>
              <td>Levels</td>
              <td>{levels}</td>
            </tr>
            <tr>
              <td>Bedrooms</td>
              <td>{bedrooms}</td>
            </tr>
            <tr>
              <td>Floor</td>
              <td>{floor}</td>
            </tr>
            <tr>
              <td>Kitchens</td>
              <td>{kitchens}</td>
            </tr>
            <tr>
              <td>Bathrooms</td>

              <td>{bathrooms}</td>
            </tr>
            <tr>
              <td>Living rooms</td>
              <td>{living_rooms}</td>
            </tr>
            <tr>
              <td>Heating system</td>
              <td>{heating_system}</td>
            </tr>
            <tr>
              <td>Energy class</td>
              <td>{energy_class}</td>
            </tr>
            <tr>
              <td>Construction year</td>
              <td>{construction_year}</td>
            </tr>
            <tr>
              <td>Availability</td>
              <td>{availability}</td>
            </tr>
            <tr>
              <td>Listing id</td>
              <td>{id}</td>
            </tr>
            <tr>
              <td>Owner</td>
              <td>
                <Link to={`/profile/${profile_id}`}>{owner}</Link>
              </td>
            </tr>
            <tr>
              <td>Created at</td>
              <td>{created_at}</td>
            </tr>
            <tr>
              <td>Updated at</td>
              <td>{updated_at}</td>
            </tr>
          </tbody>
        </Table>
        <Row className="mx-auto">
          {is_owner && listingPage ? (
            <>
              <Button
                className={`${btnStyles.Delete} ${btnStyles.Button} ${btnStyles.Medium} mr-auto`}
                onClick={() => {}}
              >
                Delete
              </Button>
              <Button
                className={`${btnStyles.Edit} ${btnStyles.Button} ${btnStyles.Medium}`}
                onClick={() => {}}
              >
                Edit
              </Button>
            </>
          ) : loggedOut ? (
            <>
              <Link
                to="/signin"
                className={`${btnStyles.Olive} ${btnStyles.Button} ${btnStyles.Medium} mx-auto btn`}
              >
                Add to list
              </Link>
            </>
          ) : (
            <Button
              className={`${btnStyles.Olive} ${btnStyles.Button} ${btnStyles.Medium} mx-auto`}
              onClick={() => {}}
            >
              Add to list
            </Button>
          )}
        </Row>
      </Col>
    </Row>
  );
};

export default Listing;
