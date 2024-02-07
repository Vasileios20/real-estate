import { useEffect, useState } from "react";
import { axiosReq } from "../api/axiosDefaults";
import { useLocation } from "react-router-dom";

const useFetchListings = () => {
  const { pathname } = useLocation();
  const [listings, setListings] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const { data } = await axiosReq.get(`/listings/`);
        setListings(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    setHasLoaded(false);
    fetchListings();
  }, [pathname]);

  return { listings, setListings, hasLoaded, pathname };
};

export default useFetchListings;
