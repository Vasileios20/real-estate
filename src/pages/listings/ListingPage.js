import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Listing from "./Listing";
import NotFound from "../../components/NotFounds";

function ListingPage() {
  const { id } = useParams();
  const [listing, setListing] = useState({ results: [] });
  const history = useHistory();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: listing }] = await Promise.all([
          axiosReq.get(`/listings/${id}/`),
        ]);
        setListing({ results: [listing] });
      } catch (error) {
        if (error.response.status === 404) {
          history.push("/notfound");
        }
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
