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
  return (
    <>
      <SearchBar />
      <Row className="mt-3">
        {listings ? (
          hasLoaded ? (
            <>
              {array.length ? (
                <InfiniteScroll
                  dataLength={array.length}
                  loader={<Asset spinner />}
                  hasMore={!!listings.next}
                  next={() => fetchMoreData(listings, setListings)}
                >
                  {array.map((listing) => (
                    <Row key={listing.id} className="mx-0 align-items-center">
                      <Col xs={12} md={6} lg={5} xl={4} className="p-0">
                        <Link to={`/listings/${listing.id}`}>
                          <Image
                            src={listing.images[0].url}
                            alt={listing.images[0].id}
                            className={`img-fluid ${styles.Listingswishlist__Image}`}
                            style={{ aspectRatio: "16/9" }}
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
                  ))}
                </InfiniteScroll>
              ) : (
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
            {array.length ? (
              array.map((listing) => (
                <Row key={listing.id} className="mx-0 align-items-center">
                  <Col xs={12} md={6} lg={5} xl={4} className="p-0">
                    <Link to={`/listings/${listing.id}`}>
                      <Image
                        src={listing.images[0].url}
                        alt={listing.images[0].id}
                        className="img-fluid"
                        style={{ aspectRatio: "16/9" }}
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
                <Asset text="No results" />
              </Container>
            )}
          </>
        )}
      </Row>
    </>
  );
};

export default ListingsWishlistPage;
