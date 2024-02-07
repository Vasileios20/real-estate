import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import styles from "../styles/Listing.module.css";
import Asset from "../components/Asset";
import { Link } from "react-router-dom";
import ListingHeader from "./ListingHeader";

const ListingsWishlistPage = ({ array, hasLoaded, setListings }) => {
  return (
    <Row className={styles.Listing}>
      {hasLoaded ? (
        <>
          {array.length ? (
            array.map((listing) => (
              <Card key={listing.id} style={{ width: "18rem" }} className="m-1">
                <Link to={`/listings/${listing.id}`}>
                  <Card.Img
                    variant="top"
                    src={listing.images[0].url}
                    alt={listing.images[0].id}
                    className="p-1"
                    height={180}
                  ></Card.Img>
                  <div style={{ marginLeft: "10px" }}>
                    <ListingHeader
                      {...listing}
                      listingPage={true}
                      setListings={setListings}
                    />
                  </div>
                </Link>
              </Card>
            ))
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
    </Row>
  );
};

export default ListingsWishlistPage;
