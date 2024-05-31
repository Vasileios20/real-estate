import React, { useEffect } from "react";

import styles from "../styles/Listing.module.css";
import { useTranslation } from "react-i18next";

const ListingHeader = (props) => {

  const { t, i18n } = useTranslation();

  useEffect(() => {
    const lng = navigator.language || navigator.userLanguage;
    i18n.changeLanguage(lng);
  }, [i18n]);

  const saleType = props.sale_type === "rent" ? `${t("propertyDetails.typeRent")}` : `${t("propertyDetails.typeSale")}`;

  return (
    <div className={styles.Listing__cardBody}>
      <div className={styles.Listing__header}>
        <div className={styles.Listing__headerListingDetails}>
          {t("propertyDetails.title", {
            type: props.type === "residential" || props.type === "commercial" ? props.sub_type : props.type,
            sale_type: saleType,
          })}, {props.municipality}, {props.county}, {props.region}
        </div>
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
        <h6 className={styles.Listing__price}>{t("propertyDetails.price")}: {props.currency} {props.price}</h6>
      </div>
    </div>
  );
};

export default ListingHeader;
