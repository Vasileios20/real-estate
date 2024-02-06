import React, { useEffect, useState } from "react";

import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import styles from "../../styles/Listing.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import Asset from "../../components/Asset";
import { Link, useLocation } from "react-router-dom";
import ListingHeader from "../../components/ListingHeader";

import Card from "react-bootstrap/Card";

function ListingsPage(props) {
  const [listings, setListings] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const { data } = await axiosReq.get(`/listings/`);
        setListings(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    setHasLoaded(false);
    fetchListings();
  }, [pathname]);

  return (
    <Row className={styles.Listing}>
      {hasLoaded ? (
        <>
          {listings.results.length ? (
            listings.results.map((listing) => (
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
}

export default ListingsPage;
