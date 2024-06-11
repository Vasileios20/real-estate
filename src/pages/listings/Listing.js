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

const Listing = ({ setShowCookieBanner, ...props }) => {

  const { t, i18n } = useTranslation();

  const lng = navigator.language || navigator.userLanguage;

  useEffect(() => {
    i18n.changeLanguage(lng);
  }, [i18n, lng]);

  console.log(lng);

  const {
    id,
    owner,
    profile_id,
    price,
    floor_area,
    levels,
    bedrooms,
    floor,
    kitchens,
    bathrooms,
    wc,
    living_rooms,
    heating_system,
    energy_class,
    construction_year,
    availability,
    created_on,
    updated_on,
    listingPage,
    images,
    longitude,
    latitude,
    amenities,
    view,
    orientation,
    length_of_facade,
    distance_from_sea,
    cover_coefficient,
    building_coefficient,
    zone,
    slope,
    service_charge,
    currency,
    land_area,
    rooms,
    storage,
    power_type,
  } = props;

  const description = lng === "en" ? props.description : props.description_gr;





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
    <div key={id} className={`${styles.Amenity}`}>
      <span>{amenity.replace(/_/g, " ")} </span>
      <i className={`fa-solid fa-square-check ${styles.AmenityChecked}`}></i>
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

        <Card.Text>Created on: {created_on}</Card.Text>
        <Card.Text>Updated on: {updated_on}</Card.Text>
      </Card.Body>
    </>
  );

  let priceValue = "";
  if (typeof price === 'number' && !isNaN(price)) {
    priceValue = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const energy_classValue = energy_class === "to_be_issued" ? t("propertyDetails.energyClassTypes.toBeIssued") : energy_class; // Translate energy class

  const land_areaValue = props.sub_type === "apartment" ? "N/A" : `${land_area} m²`;


  // Translate floor value
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

  const residentialTableData = (
    <Table className={`${styles.Listing__table} shadow`}>
      <tbody>
        {[
          { label: t("propertyDetails.price"), value: `${currency} ${priceValue}` },
          { label: t("propertyDetails.floorArea"), value: `${floor_area} m²` },
          { label: t("propertyDetails.landArea"), value: land_areaValue },
          { label: t("propertyDetails.bedrooms"), value: bedrooms },
          { label: t("propertyDetails.kitchens"), value: kitchens },
          { label: t("propertyDetails.bathrooms"), value: bathrooms },
          { label: t("propertyDetails.wc"), value: wc },
          { label: t("propertyDetails.livingRooms"), value: living_rooms },
          { label: t("propertyDetails.floorLevel"), value: floorValue },
          { label: t("propertyDetails.levels"), value: levels },
          { label: t("propertyDetails.heating"), value: heating_system },
          { label: t("propertyDetails.energyClass"), value: energy_classValue },
          { label: t("propertyDetails.yearBuilt"), value: construction_year },
          { label: t("propertyDetails.serviceCharge"), value: `${currency} ${service_charge}` },
          { label: t("propertyDetails.availability"), value: availability },
          { label: "Listing id", value: `AE000${id}` },
        ].map((feature, index) => (
          <tr key={index}>
            <td className={styles.tdWidth}>{feature.label}</td>
            <td>{feature.value}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );

  const landTableData = (
    <Table className={`${styles.Listing__table} shadow`}>
      <tbody>
        {[
          { label: t("propertyDetails.price"), value: `${currency} ${priceValue}` },
          { label: t("propertyDetails.landArea"), value: `${land_area} m²` },
          { label: t("propertyDetails.coverCoefficient"), value: cover_coefficient },
          { label: t("propertyDetails.buildingCoefficient"), value: building_coefficient },
          { label: t("propertyDetails.lengthOfFacade"), value: length_of_facade },
          { label: t("propertyDetails.orientation"), value: orientation },
          { label: t("propertyDetails.view"), value: view },
          { label: t("propertyDetails.zone"), value: zone },
          { label: t("propertyDetails.slope"), value: slope },
          { label: t("propertyDetails.distanceFromSea"), value: distance_from_sea },
          { label: t("propertyDetails.availability"), value: availability },
          { label: "Listing id", value: `AE000${id}` },
        ].map((feature, index) => (
          <tr key={index}>
            <td className={styles.tdWidth}>{feature.label}</td>
            <td>{feature.value}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );

  const commercialTableData = (
    <Table className={`${styles.Listing__table} shadow`}>
      <tbody>
        {[
          { label: t("propertyDetails.price"), value: `${currency} ${priceValue}` },
          { label: t("propertyDetails.floorArea"), value: `${floor_area} m²` },
          { label: t("propertyDetails.landArea"), value: land_area },
          { label: t("propertyDetails.levels"), value: levels },
          { label: t("propertyDetails.floorLevel"), value: floorValue },
          { label: t("propertyDetails.rooms"), value: rooms },
          { label: t("propertyDetails.bathrooms"), value: bathrooms },
          { label: t("propertyDetails.wc"), value: wc },
          { label: t("propertyDetails.storage"), value: storage },
          { label: t("propertyDetails.heating"), value: heating_system },
          { label: t("propertyDetails.energyClass"), value: energy_class },
          { label: t("propertyDetails.powerType"), value: power_type },
          { label: t("propertyDetails.yearBuilt"), value: construction_year },
          { label: t("propertyDetails.serviceCharge"), value: `${currency} ${service_charge}` },
          { label: t("propertyDetails.availability"), value: availability },
          { label: "Listing id", value: `AE000${id}` },
        ].map((feature, index) => (
          <tr key={index}>
            <td className={styles.tdWidth}>{feature.label}</td>
            <td>{feature.value}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );

  return (
    <>
      <Container className="mt-5 pt-2">
        <ListingImages images={images} listing_id={id} />

        <Row className="justify-content-start">
          <Col>
            <Col md={4} className="d-flex mt-4">
              {userStatus && staffCard}
              {userStatus && (
                <MoreDropdown handleDelete={handleDelete} handleEdit={handleEdit} />
              )}
            </Col>
            <div className={styles.Listing__cardBodyListing}>
              <ListingHeader {...props} listingPage={listingPage} />
            </div>
            <div className="my-4">
              <h5>{t("propertyDetails.description")}</h5>
              <p>{description}</p>
            </div>
          </Col>

          <h5>Features</h5>
          <Col md={8} lg={8}>
            {props.type === "residential" && residentialTableData}
            {props.type === "commercial" && commercialTableData}
            {props.type === "land" && landTableData}

            <Col className="my-5">
              <h5 className="ps-2 pb-1">Amenities</h5>
              <div className={`${styles.AmenitiesBox}`}>{amenitiesList}</div>
            </Col>
            <Col className="mx-auto my-5">{mapReady && <MapMarker {...props} setShowCookieBanner={setShowCookieBanner} />}</Col>
          </Col>

          <Col md={8} lg={4} className="mb-3">
            <ContactForm listing_id={id} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Listing;
