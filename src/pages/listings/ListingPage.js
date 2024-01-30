import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Listing from "./Listing";

function ListingPage() {
  const { id } = useParams();
  const [listing, setListing] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: listing }] = await Promise.all([
          axiosReq.get(`/listings/${id}/`),
        ]);
        setListing({ results: [listing] });
      } catch (error) {
        console.log(error);
      }
    };
    handleMount();
  }, [id]);

  return (
    <>
      <Listing {...listing.results[0]} setListings={setListing} listingPage />
    </>
  );
}

export default ListingPage;
