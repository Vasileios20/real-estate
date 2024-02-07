import useFetchListings from "../../hooks/useFetchListings";
import ListingsWishlistPage from "../../components/ListingsWishlistPage";

function ListingsPage() {
  const { listings, setListings, hasLoaded } = useFetchListings();

  return (
    <ListingsWishlistPage
      array={listings.results}
      hasLoaded={hasLoaded}
      setListings={setListings}
    />
  );
}

export default ListingsPage;
