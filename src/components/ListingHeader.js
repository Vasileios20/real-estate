import React from "react";

import styles from "../styles/Listing.module.css";

const ListingHeader = (props) => {
  const saleType = props.sale_type === "rent" ? "rent" : "buy";
  return (
    <div className={styles.Listing__header}>
      <h5 style={{ textTransform: "capitalize" }}>
        {props.type} to {saleType}
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
      <h6>Description</h6>
      <p>{props.description}</p>
      <h6>Address: </h6>
      <p>
        {props.address_number}, {props.address_street}, {props.postcode},{" "}
        {props.city}
      </p>
    </div>
  );
};

export default ListingHeader;
