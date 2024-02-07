import { useEffect, useState } from "react";
import { axiosReq } from "../api/axiosDefaults";
import { useLocation } from "react-router-dom";
import { useCurrentUser } from "../contexts/CurrentUserContext";

const useFetchWishlist = (props) => {
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === props.owner;
  const { pathname } = useLocation();
  const [listingId, setListingId] = useState([]);
  const [wishlistId, setWishlistId] = useState(null);
  const [addedToList, setAddedToList] = useState(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const { data } = await axiosReq.get(`/wishlist/`);
        const wishlist = data.results.map(
          (result) => result.owner === currentUser?.username && result.listings
        );
        const wishlistId = data.results.find(
          (result) =>
            result.listings === props.id &&
            result.owner === currentUser?.username
        );
        if (wishlistId) {
          setWishlistId(wishlistId?.id);
        }
        if (wishlistId && wishlistId.owner === currentUser?.username) {
          setAddedToList(true);
        }
        setListingId(wishlist);
      } catch (err) {
        console.log(err);
      }
    };
    fetchWishlist();
  }, [pathname, is_owner, currentUser?.username, props.id, addedToList]);
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
