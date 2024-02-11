import useFetchListings from "../../hooks/useFetchListings";
import ListingsWishlistPage from "../../components/ListingsWishlistPage";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ListingsPage() {
  const { listings, setListings, hasLoaded } = useFetchListings();
  const { state } = useLocation();
  const message = "No results";

  useEffect(() => {
    if (state && state.data) {
      console.log(state.data);
      if (state.data.results.length === 0) {
        setListings({ results: [], message });
      } else setListings(state.data);
    }
  }, [setListings, state]);

  const displayListings = state ? state.data : listings;

  return (
    <>
      <ListingsWishlistPage
        array={displayListings.results}
        hasLoaded={hasLoaded}
        setListings={setListings}
        listings={listings}
        message={message}
      />
    </>
  );
}

export default ListingsPage;
