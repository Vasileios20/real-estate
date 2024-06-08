import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "../styles/Listing.module.css";
import heroStyles from "../styles/ServicesPages.module.css";

import Asset from "./Asset";
import ListingHeader from "./ListingHeader";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import { fetchMoreData } from "../utils/utils";
import SearchBar from "./SearchBar";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
import { APIProvider, AdvancedMarker, Map } from "@vis.gl/react-google-maps";

const ListingsPage = ({ array, hasLoaded, setListings, listings, message, searchResults, setShowCookieBanner }) => {
  // The ListingsPage component is a functional component that renders the listings from the database.
  // It also renders the results of the search bar. The component uses the InfiniteScroll component to
  //  display the listings in an infinite scroll.
  // If the listings are not loaded, the component displays a spinner. If there are no results, the component displays a message.
  // The component also uses the SearchBar component to display the search bar at the top of the page.
  // The component also uses the AdvancedMarker component to display the markers on the map.
  // Get the lat and lng from the listings and push it in the array.
  const latLng = array.map((listing) => ({
    lat: listing.latitude,
    lng: listing.longitude,
  }));


  const hasCookieConsent = () => {
    const cookieConsent = document.cookie;
    if (cookieConsent === "nonEssentialCookies=true") {
      return true;
    }
    return false;
  };

  const listingMapMarkers = latLng.map((listing, index) => (
    <AdvancedMarker key={index} position={listing} />
  ));

  const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  return (
    <>
      {!searchResults && <div className={` d-flex flex-column ${heroStyles.HeroImageListings}`}>

        <h1 className={heroStyles.HeaderListings} style={{ color: "#f3f3f3", backgroundColor: "transparent", }}>Properties</h1>
        <SearchBar />
      </div>}
      <Container fluid className="px-lg-5 pt-5">
        {searchResults && <SearchBar />}
        <Row className="mt-1 justify-content-around gx-0">
          <Col xs={12} lg={12} xl={8}>
            <Container
              id="scrollableDiv"
              style={{ height: 800, overflow: "auto" }}
              className=""
            >
              {hasLoaded ? (
                <>
                  {array.length ? (
                    <InfiniteScroll

                      dataLength={array.length}
                      loader={<Asset spinner />}
                      hasMore={!!listings.next}
                      next={() => fetchMoreData(listings, setListings)}
                      scrollableTarget="scrollableDiv"
                    >
                      <Row className="mx-0">
                        {array.map((listing) => (
                          <Col key={listing.id} xs={12} md={6} lg={4} xl={4} className="mb-3 gx-1">
                            <Card style={{ height: "100%" }}>
                              <Carousel>
                                {listing.images.map((image, id) => (
                                  <Carousel.Item key={id}>
                                    <div className={styles.Listings__ImageWrapper}>
                                      <img
                                        src={image?.url}
                                        alt={image?.id}
                                        className={`img-fluid ${styles.Listings__Image}`}
                                      />
                                    </div>
                                  </Carousel.Item>
                                ))}
                              </Carousel>
                              <Link to={`/listings/${listing.id}`} className="text-decoration-none">
                                <ListingHeader
                                  {...listing}
                                  listingPage={true}
                                  setListings={setListings}
                                />
                              </Link>
                            </Card>

                          </Col>
                        ))}
                      </Row>
                    </InfiniteScroll>
                  ) : (
                    <Container>
                      <Asset message="No results found" />
                    </Container>
                  )}
                </>
              ) : (
                <Container>
                  <Asset spinner />
                </Container>
              )}
            </Container>
          </Col>
          <Col sm={12} lg={4} className="d-none d-xl-block ps-1">
            {hasCookieConsent() ? (
              <APIProvider apiKey={API_KEY}>
                <Map
                  mapId={"bf51a910020fa25a"}
                  defaultZoom={10}
                  defaultCenter={{
                    lat: 51.50898721256282,
                    lng: -0.11773481844149021,
                  }}
                  gestureHandling={"greedy"}
                  style={{ width: "100%", height: "780px" }}
                >
                  {listingMapMarkers}
                </Map>
              </APIProvider>
            ) : (
              <div className="text-center">
                <h5>Enable cookies to view map</h5>
                <p onClick={() => setShowCookieBanner("show")} style={{ cursor: "pointer" }}>Click here to enable cookies</p>
              </div>
            )
            }
          </Col>
        </Row>
      </Container >
    </>
  );
};

export default ListingsPage;
