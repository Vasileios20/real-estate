import useFetchListings from "../../hooks/useFetchListings";
import useFetchWishlist from "../../hooks/useFetchWishlist";
import ListingsWishlistPage from "../../components/ListingsWishlistPage";

function Wishlist(props) {
  /**
   * The Wishlist component is a functional component that renders a list of listings from the user's wishlist.
   * It fetches the wishlist from the API and displays the listings in a grid.
   * @param {object} props - The properties of the component.
   * @returns {JSX.Element} - The JSX for the component.
   */

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
