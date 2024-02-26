import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import styles from "../styles/Listing.module.css";

import Asset from "../components/Asset";
import ListingHeader from "./ListingHeader";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import { fetchMoreData } from "../utils/utils";
import SearchBar from "./SearchBar";

const ListingsWishlistPage = ({
  array,
  hasLoaded,
  setListings,
  listings,
  message,
}) => {
  // The ListingsWishlistPage component is a functional component that renders the listings from the database
  //or the user's wishlist. It also renders the results of the search bar. Since the component is used in two different
  //pages, the props are passed to the component to render the listings or the wishlist.
  // The component uses the InfiniteScroll component to display the listings in an infinite scroll.
  // If the listings are not loaded, the component displays a spinner. If there are no results, the component displays a message.
  // The component also uses the SearchBar component to display the search bar at the top of the page.

  return (
    <>
      <SearchBar />
      <Container
        id="scrollableDiv"
        style={{
          height: 500,
          overflow: "auto",
          marginTop: "20px",
        }}
      >
        <Row>
          {listings ? (
            hasLoaded ? (
              <>
                {/* Renders the listings or the search results */}
                {/* If there are listings and has loaded, display them in an infinite scroll component. If not, display a message. */}
                {array.length ? (
                  <InfiniteScroll
                    dataLength={array.length}
                    loader={<Asset spinner />}
                    hasMore={!!listings.next}
                    next={() => fetchMoreData(listings, setListings)}
                    scrollableTarget="scrollableDiv"
                  >
                    {/* Map through the listings array and display the listings in a grid. */}
                    {array.map((listing) => (
                      <Row key={listing.id} className="mx-0 align-items-center">
                        <Col xs={12} md={6} lg={5} xl={4} className="p-0">
                          <Link to={`/listings/${listing.id}`}>
                            <Image
                              src={listing.images[0]?.url}
                              alt={listing.images[0]?.id}
                              className={`img-fluid ${styles.Listingswishlist__Image}`}
                            ></Image>
                          </Link>
                        </Col>
                        <Col xs={12} md={6} lg={5} xl={4} className="mt-2">
                          <Link to={`/listings/${listing.id}`}>
                            <ListingHeader
                              {...listing}
                              listingPage={true}
                              setListings={setListings}
                            />
                          </Link>
                        </Col>
                      </Row>
                    ))}
                  </InfiniteScroll>
                ) : (
                  // If there are no results, display a message. ( when the search bar returns no results)
                  <Container>
                    <Row className="justify-content-center">{message}</Row>
                    <Asset text="No results" />
                  </Container>
                )}
              </>
            ) : (
              <Container>
                <Asset spinner />
              </Container>
            )
          ) : (
            <>
              {/* Renders the wishlist */}
              {/* Wishlist Page without Infinite Scroll Component because it is an array of listings */}
              {array.length ? (
                // If there are listings, display them in a grid. If not, display a message.
                array.map((listing) => (
                  <Row key={listing.id} className="mx-0 align-items-center w-100">
                    <Col xs={12} md={6} lg={5} xl={4} className="px-0">
                      <Link to={`/listings/${listing.id}`}>
                        <Image
                          src={listing.images[0]?.url}
                          alt={listing.images[0]?.id}
                          className={`img-fluid ${styles.Listingswishlist__Image}`}
                        ></Image>
                      </Link>
                    </Col>
                    <Col xs={12} md={6} lg={5} xl={4} className="mt-2">
                      <Link to={`/listings/${listing.id}`}>
                        <div>
                          <ListingHeader
                            {...listing}
                            listingPage={true}
                            setListings={setListings}
                          />
                        </div>
                      </Link>
                    </Col>
                  </Row>
                ))
              ) : (
                <Container>
                  <h1 className="text-center">Your list is empty</h1>
                </Container>
              )}
            </>
          )}
        </Row>
      </Container>
    </>
  );
};

export default ListingsWishlistPage;
