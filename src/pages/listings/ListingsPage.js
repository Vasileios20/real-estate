import useFetchListings from "../../hooks/useFetchListings";
import ListingsWishlistPage from "../../components/ListingsWishlistPage";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ListingsPage() {
  const { listings, setListings, hasLoaded } = useFetchListings();
  const { state } = useLocation();

  useEffect(() => {
    if (state && state.data) {
      setListings(state.data);
    }
  }, [setListings, state]);

  const displayListings = state ? state.data : listings;

  return (
    <ListingsWishlistPage
      array={displayListings.results}
      hasLoaded={hasLoaded}
      setListings={setListings}
    />
  );
}

export default ListingsPage;
