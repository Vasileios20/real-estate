import React, { useEffect, useState } from "react";

import styles from "../../styles/Listing.module.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";

import { Link, useHistory } from "react-router-dom";
import ListingImages from "./ListingImages";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropDown";
import ListingHeader from "../../components/ListingHeader";
import useUserStatus from "../../hooks/useUserStatus";
import ContactForm from "../contact/ContactForm";
import { useTranslation } from "react-i18next";
import MapMarker from "../../components/MapMarker";
import { Container } from "react-bootstrap";

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
   * - longitude: number
   * - latitude: number
   * @returns {JSX.Element} - The JSX for the component.
   */

  const { t, i18n } = useTranslation();

  useEffect(() => {
    const lng = navigator.language || navigator.userLanguage;
    i18n.changeLanguage(lng);
  }, [i18n]);

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
    longitude,
    latitude,
    amenities,
  } = props;

  const amenitiesArray = [];
  if (amenities) {
    Object.entries(amenities).forEach(([key, value]) => {
      if (value) {
        Object.entries(value).forEach(([key, value]) => {
          if (value === true) {
            amenitiesArray.push(key);
          }
        });
      }
    }
    );
  }


  const amenitiesList = amenitiesArray.map((amenity, id) => (
    <div key={id} className={styles.Amenity}>
      <span>{amenity.replace(/_/g, " ")} </span>
      <i className="fas fa-check"></i>
    </div>
  ));



  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    // Check if latitude and longitude are defined
    if (latitude !== undefined && longitude !== undefined) {
      setMapReady(true);
    }
  }, [latitude, longitude]);

  const history = useHistory();
  const userStatus = useUserStatus();

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
    <>
      <Container className="mt-5">
        <ListingImages images={images} listing_id={id} />

        <Row className="justify-content-start">
          <Col lg={8}>


            <Col md={4} className="d-flex mt-4">
              {userStatus && staffCard}
              {userStatus && (
                <MoreDropdown handleDelete={handleDelete} handleEdit={handleEdit} />
              )}
            </Col>

            <ListingHeader {...props} listingPage={listingPage} />
            <h5>{t("propertyDetails.description")}</h5>
            <p>
              {props.description}
            </p>
          </Col>
        </Row>
        <Row>

          <h5>Features</h5>
          <Col md={8} lg={4}>
            <Table className={styles.Listing__table}>
              <tbody>
                <tr>
                  <td className={styles.tdWidth}>
                    {t("propertyDetails.price")}{" "}
                  </td>
                  <td>£ {price}</td>
                </tr>
                <tr>
                  <td>{t("propertyDetails.floorArea")} </td>
                  <td>
                    {surface} m<sup>2</sup>
                  </td>
                </tr>
                <tr>
                  <td>{t("propertyDetails.levels")} </td>
                  <td>{levels}</td>
                </tr>
                <tr>
                  <td>{t("propertyDetails.bedrooms")} </td>
                  <td>{bedrooms}</td>
                </tr>
                <tr>
                  <td>{t("propertyDetails.floorLevel")} </td>
                  <td>{floorValue}</td>
                </tr>
                <tr>
                  <td>{t("propertyDetails.kitchens")} </td>
                  <td>{kitchens}</td>
                </tr>
                <tr>
                  <td>{t("propertyDetails.bathrooms")} </td>

                  <td>{bathrooms}</td>
                </tr>
                <tr>
                  <td>{t("propertyDetails.livingRooms")} </td>
                  <td>{living_rooms}</td>
                </tr>
                <tr>
                  <td>{t("propertyDetails.heating")} </td>
                  <td>{heating_system}</td>
                </tr>
                <tr>
                  <td>{t("propertyDetails.energyClass")} </td>
                  <td>{energy_class}</td>
                </tr>
                <tr>
                  <td>{t("propertyDetails.yearBuilt")} </td>
                  <td>{construction_year}</td>
                </tr>
                <tr>
                  <td>{t("propertyDetails.availability")} </td>
                  <td>{availability}</td>
                </tr>
                <tr>
                  <td>Listing id</td>
                  <td>{id}</td>
                </tr>
                <tr>
                  <td>amenities</td>

                </tr>
              </tbody>
            </Table>
            <Col className="mb-3">
              {mapReady && <MapMarker {...props} />}
            </Col>
          </Col>
          <Col sm={4}>
            <div className={styles.AmenitiesBox}>
              {amenitiesList}

            </div>
          </Col>
          <Col md={8} lg={4} className="">
            <ContactForm listing_id={id} />
          </Col>



        </Row>
      </Container >
    </>
  );
};

export default Listing;
