import useFetchListings from "../../hooks/useFetchListings";
import useFetchWishlist from "../../hooks/useFetchWishlist";
import ListingsWishlistPage from "../../components/ListingsWishlistPage";

function Wishlist(props) {
  const { listingId } = useFetchWishlist(props);
  const { listings, setListings, hasLoaded } = useFetchListings();

  const wishlistArray = listings.results.filter((listing) =>
    listingId.includes(listing.id)
  );

  return (
    <ListingsWishlistPage
      array={wishlistArray}
      hasLoaded={hasLoaded}
      setListings={setListings}
    />
  );
}

export default Wishlist;
