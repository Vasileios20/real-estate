import React from "react";
import NoResults from "../assets/404-not-found.png";
import Asset from "./Asset";

const NotFound = () => {
  return (
    <div>
      <Asset src={NoResults} />
    </div>
  );
};

export default NotFound;
