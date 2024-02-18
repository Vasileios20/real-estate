import useFetchListings from "../../hooks/useFetchListings";
import ListingsWishlistPage from "../../components/ListingsWishlistPage";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ListingsPage() {
  /**
   * The ListingsPage component is a functional component that renders the listings page of the application.
   * It uses the useFetchListings hook to fetch the listings from the API.
   * It also uses the useLocation hook to get the state from the location object.
   * If the state is present, it sets the listings to the state data.
   * @returns {JSX.Element} - The JSX for the component.
   */

  const { listings, setListings, hasLoaded } = useFetchListings();
  const { state } = useLocation();
  const message = "No results";

  useEffect(() => {
    if (state && state.data) {
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
