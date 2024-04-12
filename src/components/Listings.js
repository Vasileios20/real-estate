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

const ListingsPage = ({ array, hasLoaded, setListings, listings, message }) => {
  // The ListingsPage component is a functional component that renders the listings from the database.
  // It also renders the results of the search bar. The component uses the InfiniteScroll component to
  //  display the listings in an infinite scroll.
  // If the listings are not loaded, the component displays a spinner. If there are no results, the component displays a message.
  // The component also uses the SearchBar component to display the search bar at the top of the page.

  const renderCardRow = () => {
    const cardRow = [];

    for (let i = 0; i < array.length; i += 2) {
      const cardsInRow = array.slice(i, i + 2).map((listing) => (
        <Col key={listing.id} className="my-2 px-0 w-100">
          <Card
            style={{ width: "15rem", height: "100%" }}
            className="mx-auto rounded p-0"
          >
            <Link to={`/listings/${listing.id}`}>
              <Carousel indicators={false}>
                {listing.images.map((image, index) => (
                  <Carousel.Item key={index}>
                    <img
                      className={`d-block w-100 ${styles.Listings__Image}`}
                      src={image.url}
                      alt={image.id}
                      height={150}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
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
        <Row key={i} className="justify-content-around">
          {cardsInRow}
        </Row>
      );
    }

    return cardRow;
  };

  return (
    <>
      <SearchBar />
      <Container fluid style={{ marginTop: "20px" }}>
        <Row>
          <Col xs={12} sm={12} md={10} lg={7}>
            <Container
              id="scrollableDiv"
              style={{ height: 500, overflow: "auto" }}
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
          </Col>
          <Col md={3}>
            <h1>Map</h1>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ListingsPage;
