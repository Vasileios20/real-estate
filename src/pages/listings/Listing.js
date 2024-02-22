import React, { useState } from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

import styles from "../../styles/Listing.module.css";
import btnStyles from "../../styles/Button.module.css";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";

import { Link, useHistory } from "react-router-dom";
import ListingImages from "./ListingImages";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropDown";
import ListingHeader from "../../components/ListingHeader";
import useFetchWishlist from "../../hooks/useFetchWishlist";
import useUserStatus from "../../hooks/useUserStatus";

const Listing = (props) => {
  /**
   * The Listing component is a functional component that renders the details of a listing.
   * It receives the following props:
   * - id: number
   * - owner: string
   * - profile_id: number
   * - price: number
   * - surface: number
   * - levels: number
   * - bedrooms: number
   * - floor: number
   * - kitchens: number
   * - bathrooms: number
   * - living_rooms: number
   * - heating_system: string
   * - energy_class: string
   * - construction_year: number
   * - availability: string
   * - created_at: string
   * - updated_at: string
   * - listingPage: boolean
   * - images: array
   * - setListings: function
   * @returns {JSX.Element} - The JSX for the component.
   */

  const {
    id,
    owner,
    profile_id,
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
    setListings,
  } = props;

  // Fetch the wishlist from the API, using the useFetchWishlist hook.
  const { addedToList, setAddedToList, wishlistId } = useFetchWishlist(props);

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const loggedOut = currentUser === null;
  const [errors, setErrors] = useState(null);
  const [success, setSuccess] = useState(false);
  const history = useHistory();
  const userStatus = useUserStatus();

  // Add listing to wishlist
  const handleAddToWishlist = async () => {
    try {
      const { data } = await axiosRes.post("/wishlist/", { listings: id });
      setListings((prevListings) => ({
        ...prevListings,
        results: prevListings.results.map((listing) => {
          return listing.id === id
            ? {
                ...listing,
                listing_id: data.id,
              }
            : listing;
        }),
      }));

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setAddedToList(true);
      }, 3000);
    } catch (err) {
      // console.log(err);
      setErrors(err.response?.data);
    }
  };

  // Remove listing from wishlist
  const handleRemoveFromWishlist = async () => {
    try {
      await axiosRes.delete(`/wishlist/${wishlistId}/`);
      setListings((prevListings) => ({
        ...prevListings,
        results: prevListings.results.map((listing) => {
          return listing.id === id
            ? {
                ...listing,
                listing_id: null,
              }
            : listing;
        }),
      }));
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setAddedToList(false);
      }, 3000);
    } catch (err) {
      // console.log(err);
    }
  };

  // Delete listing
  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/listings/${id}/`);
      history.push("/listings");
    } catch (err) {
      // console.log(err);
    }
  };

  // Edit listing
  const handleEdit = () => {
    history.push(`/listings/${id}/edit`);
  };

  const staffCard = (
    <>
      <Card.Body>
        <Card.Text>
          <Link to={`/profiles/${profile_id}`}>Owner: {owner}</Link>
        </Card.Text>

        <Card.Text>Created at: {created_at}</Card.Text>
        <Card.Text>Updated at: {updated_at}</Card.Text>
      </Card.Body>
    </>
  );

  const floorValue =
    floor < 0
      ? "Basement"
      : floor === 0
      ? "Ground floor"
      : floor === 1
      ? `${floor}st `
      : floor === 2
      ? `${floor}nd `
      : floor === 3
      ? `${floor}rd `
      : `${floor}th `;

  return (
    <Row className={styles.Listing}>
      <ListingImages images={images} />

      <Col md={4}>
        <ListingHeader {...props} listingPage={listingPage} />
      </Col>
      <Col md={4}>{userStatus && staffCard}</Col>
      <Col md={4} className="d-flex mt-4">
        {userStatus && (
          <MoreDropdown handleDelete={handleDelete} handleEdit={handleEdit} />
        )}
      </Col>

      <Col md={8} lg={5}>
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
              <td>{floorValue}</td>
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
          </tbody>
        </Table>
        {loggedOut ? (
          <>
            <Link
              to="/signin"
              className={`${btnStyles.Add} ${btnStyles.Button} mx-auto btn`}
            >
              Add to list
            </Link>
          </>
        ) : !is_owner && listingPage ? (
          addedToList ? (
            <>
              {success && (
                <Alert
                  variant="danger"
                  className={`${btnStyles.Wide} ${btnStyles.Message}`}
                >
                  Removed from wishlist
                </Alert>
              )}
              {errors?.detail && <p className="text-danger">{errors.detail}</p>}

              <Button
                className={`${btnStyles.Button} ${btnStyles.Remove}  ${
                  success ? btnStyles.MessageNone : null
                } my-2`}
                onClick={handleRemoveFromWishlist}
              >
                Remove from wishlist
              </Button>
            </>
          ) : (
            <>
              {success && (
                <Alert
                  variant="success"
                  className={`${btnStyles.Wide} ${btnStyles.Message}`}
                >
                  Added to wishlist
                </Alert>
              )}
              {errors?.detail && <p className="text-danger">{errors.detail}</p>}

              <Button
                className={`${btnStyles.Add} ${btnStyles.Button} ${
                  success ? btnStyles.MessageNone : null
                } my-2 `}
                onClick={handleAddToWishlist}
              >
                Add to wishlist
              </Button>
            </>
          )
        ) : null}
      </Col>
    </Row>
  );
};

export default Listing;
