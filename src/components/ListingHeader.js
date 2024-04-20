import React, { useEffect } from "react";

import styles from "../styles/Listing.module.css";
import { useTranslation } from "react-i18next";
import { Card } from "react-bootstrap";

const ListingHeader = (props) => {
  /**
   * This component is used to display the header of a listing.
   * It receives the following props:
   * - type: string
   * - sale_type: string
   * - description: string
   * - address_number: string
   * - address_street: string
   * - postcode: string
   * - city: string
   */

  const saleType = props.sale_type === "rent" ? "rent" : "buy";
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const lng = navigator.language || navigator.userLanguage;
    i18n.changeLanguage(lng);
  }, [i18n]);
  return (
    <Card.Body>
      <div className={styles.Listing__header}>
        <h5 style={{ textTransform: "capitalize" }}>
          {/* {props.id} */}
          {/* {props.type} to {saleType} */}
          <p>
            {t("propertyDetails.title", {
              type: `${props.type}`,
              sale_type: `${saleType}`,
            })}
          </p>
        </h5>
        <div className={styles.Listing__fontawsome}>
          <p>
            <i className="fa-solid fa-bed"> {props.bedrooms}</i>
          </p>
          <p>
            <i className="fa-solid fa-bath"> {props.bathrooms}</i>
          </p>
          <p>
            <i className="fa-solid fa-stairs"> {props.floor}</i>
          </p>
        </div>
        {/* <h3>Description</h3>
        <p>{props.description}</p> */}
        <h6>{t("propertyDetails.address")}: </h6>
        <p>
          {props.address_number}, {props.address_street}, {props.postcode},{" "}
          {props.city}
        </p>
      </div>
    </Card.Body>
  );
};

export default ListingHeader;
