import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import Image from "react-bootstrap/Image";
import styles from "../styles/Listing.module.css";

import Asset from "./Asset";
import ListingHeader from "./ListingHeader";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import { fetchMoreData } from "../utils/utils";
import SearchBar from "./SearchBar";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
import { APIProvider, AdvancedMarker, Map } from "@vis.gl/react-google-maps";
import homeStyles from "../styles/HomePage.module.css";
import ListingImages from "../pages/listings/ListingImages";

const ListingsPage = ({ array, hasLoaded, setListings, listings, message }) => {
  // The ListingsPage component is a functional component that renders the listings from the database.
  // It also renders the results of the search bar. The component uses the InfiniteScroll component to
  //  display the listings in an infinite scroll.
  // If the listings are not loaded, the component displays a spinner. If there are no results, the component displays a message.
  // The component also uses the SearchBar component to display the search bar at the top of the page.

  // Get the lat and lng from the listings and push it in the array.
  const latLng = array.map((listing) => ({
    lat: listing.latitude,
    lng: listing.longitude,
  }));

  const renderCardRow = () => {
    const cardRow = [];

    for (let i = 0; i < array.length; i += 2) {
      const cardsInRow = array.slice(i, i + 2).map((listing) => (
        <Col key={listing.id} className="my-2 px-0 mx-0">
          <Card
            style={{ width: "18rem", height: "100%" }}
            className="mx-auto rounded p-0"
          >
            <Link to={`/listings/${listing.id}`}>
              <Carousel indicators={false}>
                {listing.images.map((image, index) => (
                  <Carousel.Item key={index}>
                    <div className={styles.Listings__ImageWrapper}>
                      <img
                        className={`${styles.Listings__Image}`}
                        src={image.url}
                        alt={image.id}
                      />
                    </div>
                  </Carousel.Item>
                ))}
              </Carousel>
              {/* <ListingImages images={listing.images} /> */}
              <div style={{ marginLeft: "10px" }}>
                <ListingHeader
                  {...listing}
                  listingPage={true}
                  setListings={setListings}
                />
              </div>
            </Link>
          </Card>
        </Col>
      ));
      cardRow.push(
        <Row key={i} className="justify-content-between mx-0">
          {cardsInRow}
        </Row>
      );
    }

    return cardRow;
  };


  const listingMapMarkers = latLng.map((listing, index) => (
    <AdvancedMarker key={index} position={listing} />
  ));


  const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  return (
    <>

      <Container fluid style={{ marginTop: "20px" }}>
        <SearchBar />
        <Row className="mt-3">
          <Col xs={12} lg={7}>
            <Container
              id="scrollableDiv"
              style={{ height: 500, overflow: "auto" }}
              className="border shadow-sm p-3 rounded"
            >
              {hasLoaded ? (
                <>
                  {array.length ? (
                    <InfiniteScroll
                      children={renderCardRow()}
                      dataLength={array.length}
                      loader={<Asset spinner />}
                      hasMore={!!listings.next}
                      next={() => fetchMoreData(listings, setListings)}
                    />
                  ) : (
                    <Container>
                      <Asset text="No results" />
                    </Container>
                  )}
                </>
              ) : (
                <Container>
                  <Asset spinner />
                </Container>
              )}
            </Container>
            <hr className="" />
          </Col>
          <Col sm={12} lg={5}>
            <APIProvider apiKey={API_KEY}>
              <Map
                mapId={"bf51a910020fa25a"}
                defaultZoom={8}
                defaultCenter={{
                  lat: 51.50898721256282,
                  lng: -0.11773481844149021,
                }}
                gestureHandling={"greedy"}
                style={{ width: "100%", height: "500px" }}
              >
                {listingMapMarkers}
              </Map>
            </APIProvider>
          </Col>
        </Row>
      </Container>
    </>
    // <>
    //   <SearchBar />
    //   <Container fluid style={{ marginTop: "20px" }}>
    //     <Row className="justify-content-around">
    //       <Col xs={12} sm={12} md={10} lg={7}>
    //         <Container
    //           id="scrollableDiv"
    //           style={{ height: 500, overflow: "auto" }}
    //         >
    //           {hasLoaded ? (
    //             <>
    //               {/* {array.length ? (
    //                 <InfiniteScroll
    //                   children={renderCardRow()}
    //                   dataLength={array.length}
    //                   loader={<Asset spinner />}
    //                   hasMore={!!listings.next}
    //                   next={() => fetchMoreData(listings, setListings)}
    //                 /> */}
    //               {listings.results.length ? (
    //                 <Row xs={1} md={2} className="g-4">
    //                   {Array.from(listings.results).map((listing) => (
    //                     <Col key={listing.id}>
    //                       <Link to={`/listings/${listing.id}`}>
    //                         <Card style={{ height: "100%" }}>
    //                           <Carousel indicators={false}>
    //                             {listing.images.map((image, index) => (
    //                               <Carousel.Item
    //                                 key={index}
    //                                 style={{ height: "200px" }}
    //                               >
    //                                 <Card.Img
    //                                   className={`${styles.Listings__Image}`}
    //                                   src={image.url}
    //                                   alt={image.id}
    //                                   variant="top"
    //                                 // style={{ height: "200px" }}
    //                                 />
    //                               </Carousel.Item>
    //                             ))}
    //                           </Carousel>

    //                           <Card.Body>
    //                             <ListingHeader
    //                               {...listing}
    //                               listingPage={true}
    //                             />
    //                           </Card.Body>
    //                         </Card>
    //                       </Link>
    //                     </Col>
    //                   ))}
    //                 </Row>
    //               ) : (
    //                 <Container>
    //                   {message}
    //                 </Container>
    //               )}
    //             </>
    //           ) : (
    //             <Container>
    //               <Asset spinner />
    //             </Container>
    //           )}
    //         </Container>
    //       </Col>
    //       <Col xs={10} lg={5} className="mt-3 mt-lg-0">
    //         <APIProvider apiKey={API_KEY}>
    //           <Map
    //             mapId={"bf51a910020fa25a"}
    //             defaultZoom={8}
    //             defaultCenter={{
    //               lat: 51.50898721256282,
    //               lng: -0.11773481844149021,
    //             }}
    //             gestureHandling={"greedy"}
    //             style={{ width: "100%", height: "500px" }}
    //           >
    //             {listingMapMarkers}
    //           </Map>
    //         </APIProvider>
    //       </Col>
    //     </Row>
    //   </Container>
    // </>
  );
};

export default ListingsPage;
