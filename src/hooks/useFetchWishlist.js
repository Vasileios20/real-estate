import { useEffect, useState } from "react";
import { axiosReq } from "../api/axiosDefaults";
import { useLocation } from "react-router-dom";
import { useCurrentUser } from "../contexts/CurrentUserContext";

const useFetchWishlist = (props) => {
  /**
   * The useFetchWishlist hook is a custom hook that fetches the wishlist data from the API.
   * @returns {Array} - The listing id.
   * @returns {Function} - A function to set the listing id state.
   * @returns {Number} - The wishlist id.
   * @returns {Function} - A function to set the wishlist id state.
   * @returns {String} - The pathname from the location object.
   * @returns {Boolean} - A boolean indicating whether the current user is the owner of the listing.
   * @returns {Object} - The current user data.
   * @returns {Boolean} - A boolean indicating whether the listing has been added to the wishlist.
   * @returns {Function} - A function to set the added to list state.
   */

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === props.owner;
  const { pathname } = useLocation();
  const [listingId, setListingId] = useState([]);
  const [wishlistId, setWishlistId] = useState(null);
  const [addedToList, setAddedToList] = useState(null);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    // let mounted = true;
    // Fetch the wishlist from the API.
    const fetchWishlist = async () => {
      try {
        const { data } = await axiosReq.get(`/wishlist/`);
        // Map through the wishlist data and return the listings that match the current user's username.
        const wishlist = data.results.map(
          (result) => result.owner === currentUser?.username && result.listings
        );
        // Find the wishlist id that matches the current user's username and the listing id.
        const wishlistId = data.results.find(
          (result) =>
            result.listings === props.id &&
            result.owner === currentUser?.username
        );
        if (mounted) {
          // If the wishlist id exists, set the wishlist id state.
          if (wishlistId) {
            setWishlistId(wishlistId?.id);
          }
          // If the wishlist id exists and the owner matches the current user's username, set the added to list state to true.
          if (wishlistId && wishlistId.owner === currentUser?.username) {
            setAddedToList(true);
          }
          setListingId(wishlist);
        }
      } catch (err) {
        // console.log(err);
      }
    };
    fetchWishlist();
    return () => {
      setMounted(false);
    };
  }, [
    pathname,
    is_owner,
    currentUser?.username,
    props.id,
    addedToList,
    mounted,
  ]);
  return {
    listingId,
    setListingId,
    wishlistId,
    setWishlistId,
    pathname,
    is_owner,
    currentUser,
    addedToList,
    setAddedToList,
  };
};

export default useFetchWishlist;
