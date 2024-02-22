import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Listing from "./Listing";

function ListingPage() {
  /**
   * The ListingPage component is a functional component that renders a single listing.
   * It fetches the listing data from the API using the listing id from the URL.
   * @returns {JSX.Element} - The JSX for the component.
   * @param {Object} listing - The listing data.
   * @param {Function} setListings - A function to set the listings state.
   */

  const { id } = useParams();
  const [listing, setListing] = useState({ results: [] });
  const history = useHistory();

  if (window.localStorage.getItem("edited") === "true") {
    window.location.reload();
    localStorage.removeItem("edited");
  }

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: listing }] = await Promise.all([
          axiosReq.get(`/listings/${id}/`),
        ]);
        setListing({ results: [listing] });
      } catch (err) {
        if (err.response.status === 404) {
          history.push("/notfound");
        }
        // console.log(err);
      }
    };
    handleMount();
  }, [id, history]);

  return (
    <>
      <Listing {...listing.results[0]} setListings={setListing} listingPage />
    </>
  );
}

export default ListingPage;
