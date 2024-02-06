import React, { useEffect, useState } from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

import styles from "../../styles/Listing.module.css";
import btnStyles from "../../styles/Button.module.css";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";

import { Link, useHistory } from "react-router-dom";
import ListingImages from "./ListingImages";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropDown";

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
    setListings,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const loggedOut = currentUser === null;
  const [errors, setErrors] = useState(null);
  const [success, setSuccess] = useState(false);
  const [addedToList, setAddedToList] = useState(null);
  const [wishlistId, setWishlistId] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const { data } = await axiosRes.get("/wishlist/");

        const wishlist = data.results.find(
          (result) =>
            result.listings === id && result.owner === currentUser?.username
        );

        if (wishlist) {
          setWishlistId(wishlist.id);
        }
        if (wishlist && wishlist.owner === currentUser?.username) {
          setAddedToList(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchWishlist();
  }, [id, currentUser, addedToList]);

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
    } catch (error) {
      console.log(error);
      setErrors(error.response?.data);
    }
  };

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
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/listings/${id}/`);
      history.goBack();
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = () => {
    history.push(`/listings/${id}/edit`);
  };

  return (
    <Row className={styles.Listing}>
      <ListingImages images={images} />

      <Col md={8}>
        <h4 style={{ textTransform: "capitalize" }} className="d-flex">
          {type} to {sale_type}
        </h4>
        <div className={styles.Listing__fontawsome}>
          <p>
            <i className="fa-solid fa-bed"> {bedrooms}</i>
          </p>
          <p>
            <i className="fa-solid fa-bath"> {bathrooms}</i>
          </p>
          <p>
            <i className="fa-solid fa-stairs"> {floor}</i>
          </p>
        </div>
        <h5>Description</h5>
        <p>{description}</p>
        <h6>Address: </h6>
        <p>
          {address_number}, {address_street}, {postcode}, {city}
        </p>
      </Col>
      <Col md={4} className="d-flex">
        {is_owner && (
          <MoreDropdown handleDelete={handleDelete} handleEdit={handleEdit} />
        )}
      </Col>

      <Col className="col-md-8 col-lg-5">
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
        {loggedOut ? (
          <>
            <Link
              to="/signin"
              className={`${btnStyles.Add} ${btnStyles.Button} ${btnStyles.Wide} mx-auto btn`}
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
                className={`${btnStyles.Button} ${btnStyles.Remove} ${
                  btnStyles.Wide
                } ${success ? btnStyles.MessageNone : null} my-2`}
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
                  btnStyles.Wide
                } ${success ? btnStyles.MessageNone : null} my-2 `}
                onClick={handleAddToWishlist}
              >
                Add to wishlist
              </Button>
            </>
          )
        ) : null}
      </Col>
      <Col md={8} className="d-flex"></Col>
    </Row>
  );
};

export default Listing;
