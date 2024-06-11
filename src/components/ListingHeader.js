import React, { useEffect } from "react";

import styles from "../styles/Listing.module.css";
import { useTranslation } from "react-i18next";

const ListingHeader = (props) => {

  const { t, i18n } = useTranslation();

  const lng = navigator.language || navigator.userLanguage;

  useEffect(() => {

    i18n.changeLanguage(lng);
  }, [i18n, lng]);

  const saleType = props.sale_type === "rent" ? `${t("propertyDetails.typeRent")}` : `${t("propertyDetails.typeSale")}`;

  const translatedType = t(`propertyDetails.types.${props.type}`);

  const translatedSubType = t(`propertyDetails.subTypes.${props.sub_type}`);
  const municipality = lng === "en" ? props.municipality : props.municipality_gr;
  const county = lng === "en" ? props.county : props.county_gr;
  const region = lng === "en" ? props.region : props.region_gr;

  let priceValue = "";
  if (typeof props.price === 'number' && !isNaN(props.price)) {
    priceValue = props.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <div className={styles.Listing__cardBody}>
      <div className={styles.Listing__header}>
        <div className={styles.Listing__headerListingDetails}>
          {t("propertyDetails.title", {

            sale_type: saleType,
            type: translatedType === "residential" || translatedType === "commercial" ? translatedSubType : translatedSubType,
          })}, {municipality}, {county}, {region}
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
        <h6 className={styles.Listing__price}>{t("propertyDetails.price")}: {props.currency} {priceValue}</h6>
      </div>
    </div>
  );
};

export default ListingHeader;
