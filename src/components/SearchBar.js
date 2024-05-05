import React, { useEffect, useMemo, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import styles from "../styles/SearchBar.module.css";
import btnStyles from "../styles/Button.module.css";

import { axiosReq } from "../api/axiosDefaults";
import { useHistory } from "react-router-dom";

const SearchBar = () => {
  /**
   * The SearchBar component is a functional component that renders a search bar for the listings page.
   * It contains a form with input fields for the search query, the sale type, the type, the price, and the surface.
   * It also contains a submit button that sends a request to the API with the search parameters.
   * @returns {JSX.Element} - The JSX for the component.
   */

  const [query, setQuery] = useState("");
  const [saleType, setSaleType] = useState("rent");
  const [type, setType] = useState("apartment");
  const [price, setPrice] = useState({ min: "", max: "" });
  const [surface, setSurface] = useState({ min: "", max: "" });
  const history = useHistory();
  const [update, setUpdate] = useState(false);
  const location = history.location;
  const [errors, setErrors] = useState("");
  const renderTooltip = (props) => (
    <Tooltip id="tooltip-disabled" {...props}>
      To search please choose rent or buy.
    </Tooltip>
  );

  // Fetch the search parameters from the URL and set the state.
  useMemo(() => {
    const search = history.location.search;
    const params = new URLSearchParams(search);
    const saleType = params.get("sale_type");
    const type = params.get("type");
    const minPrice = params.get("min_price");
    const maxPrice = params.get("max_price");
    const minSurface = params.get("min_surface");
    const maxSurface = params.get("max_surface");
    const searchQuery = params.get("search");
    setSaleType(saleType);
    setType(type);
    setPrice({ min: minPrice, max: maxPrice });
    setSurface({ min: minSurface, max: maxSurface });
    setQuery(searchQuery);
    setUpdate(false);
  }, [history.location.search]);

  // Submit the search form.
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Fetch the listings from the API using the search parameters.
    let path = `/listings/?sale_type=${saleType}`;
    if (query) {
      path += `&search=${query}`;
    }
    if (type) {
      path += `&type=${type}`;
    }
    if (price.min) {
      path += `&min_price=${price.min}`;
    }
    if (price.max) {
      path += `&max_price=${price.max}`;
    }
    if (surface.min) {
      path += `&min_surface=${surface.min}`;
    }
    if (surface.max) {
      path += `&max_surface=${surface.max}`;
    }
    try {
      const { data } = await axiosReq.get(`${path}`);
      history.push(`${path}`, { data: data });
    } catch (err) {
      // console.log(err);
      if (err.response.status === 400) {
        setErrors("Please select one option");
      }
    }
  };

  // Update the button label if the search parameters are not empty.
  useEffect(() => {
    setUpdate(false);
    const updateButtonLabel = () => {
      if (
        location.pathname === "/listings/" &&
        (saleType ||
          query ||
          type ||
          price.min ||
          price.max ||
          surface.min ||
          surface.max)
      ) {
        setUpdate(true);
      }
    };
    updateButtonLabel();
  }, [
    update,
    query,
    type,
    price,
    surface,
    saleType,
    location.pathname,
    location.search,
  ]);

  return (
    <Container className="mb-5">
      <Form
        className={`p-3 ${styles.HomeBar}`}
        onSubmit={handleSubmit}
      >
        <Row className="align-items-center justify-content-between ms-lg-5 mb-lg-0">
          <Col sm={12}>
            {errors &&
              (setTimeout(() => setErrors(""), 3000),
                (
                  <Alert className={styles.ErrorWidth} variant="warning">
                    {errors}
                  </Alert>
                ))}
            <Button
              className={saleType === "rent" ? `${btnStyles.Black} ${btnStyles.Button} me-2` : `${btnStyles.BlackOutline} ${btnStyles.Button} me-2`}
              onClick={() => setSaleType("rent")}
            >
              Rent
            </Button>
            <Button
              className={saleType === "sale" ? `${btnStyles.Black}  ${btnStyles.Button}` : `${btnStyles.BlackOutline} ${btnStyles.Button}`}
              onClick={() => setSaleType("sale")}
            >
              Buy
            </Button>
          </Col>

          <Col sm={6} md={3}>
            <Form.Label className="">Location</Form.Label>
            <Form.Control
              value={query ? query : ""}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="City, postcode, address"
              className={styles.SearchInput}
              aria-label="search"
            />
          </Col>
          <Col sm={6} md={2}>
            <Form.Label>Type</Form.Label>
            <Form.Select
              className={styles.SearchInput}
              aria-label="type"
              as="select"
              name="type"
              value={type ? type : ""}
              onChange={(e) => setType(e.target.value)}
            >

              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="land">Land</option>
              <option value="commercial">Commercial</option>
            </Form.Select>
          </Col>
          <Col lg={2} md={3} sm={6} className="mb-3">
            <Form.Group as={Row} controlId="formGroupPrice">
              <Form.Label column className="mb-0" style={{ fontWeight: "500" }}>Price</Form.Label>
              <Col sm={12} className="d-flex align-items-center">
                <Form.Control
                  className={styles.SearchInput}
                  aria-label="min price"
                  type="number"
                  placeholder="Min"
                  min="0"
                  value={price.min ? price.min : ""}
                  onChange={(e) => setPrice({ ...price, min: e.target.value })}
                />
                <Form.Control
                  className={styles.SearchInput}
                  aria-label="max price"
                  type="number"
                  placeholder="Max"
                  min={price.min ? price.min : "0"}
                  max="10000000"
                  value={price.max ? price.max : ""}
                  onChange={(e) => setPrice({ ...price, max: e.target.value })}
                />
              </Col>
            </Form.Group>
          </Col>
          <Col lg={2} md={3} sm={6} className="mb-3">
            <Form.Group as={Row} controlId="formGroupSurface">
              <Form.Label column className="mb-0" style={{ fontWeight: "500" }}>
                {type === "land" ? "Land Area" : "Floor Area"}
              </Form.Label>
              <Col sm={12} className="d-flex align-items-center">
                <Form.Control
                  className={styles.SearchInput}
                  aria-label="min surface"
                  type="number"
                  placeholder="Min"
                  min="0"
                  value={surface.min ? surface.min : ""}
                  onChange={(e) => setSurface({ ...surface, min: e.target.value })}
                />
                <Form.Control
                  className={styles.SearchInput}
                  aria-label="max surface"
                  type="number"
                  placeholder="Max"
                  min={surface.min ? surface.min : "0"}
                  max="1000000"
                  value={surface.max ? surface.max : ""}
                  onChange={(e) => setSurface({ ...surface, max: e.target.value })}
                />
              </Col>
            </Form.Group>
          </Col>


          <Col xs={8} lg={3} className="mt-0 mt-md-1 mt-lg-4">
            {!saleType ? (
              <OverlayTrigger
                placement="bottom"
                delay={{ show: 50, hide: 300 }}
                overlay={renderTooltip}
              >
                <span className="d-inline-block">
                  <Button
                    className={`${btnStyles.Button} ${btnStyles.Black} me-2`}
                    type="submit"
                    style={{ pointerEvents: 'none' }}
                  >
                    {update ? "Update" : "Search"}
                  </Button>
                  <Button
                    className={`${btnStyles.Button} ${btnStyles.Remove}`}
                    onClick={() => {
                      setQuery("");
                      setSaleType("");
                      setType("");
                      setPrice({ min: "", max: "" });
                      setSurface({ min: "", max: "" });
                    }}>
                    Clear
                  </Button>
                </span>
              </OverlayTrigger>
            ) : (
              <>
                <Button
                  className={`${btnStyles.Button} ${btnStyles.BlackSearch} me-2`}
                  type="submit"
                >
                  {update ? "Update" : "Search"}
                </Button>
                <Button
                  className={`${btnStyles.Button} ${btnStyles.Remove}`}
                  onClick={() => {
                    setQuery("");
                    setSaleType("");
                    setType("");
                    setPrice({ min: "", max: "" });
                    setSurface({ min: "", max: "" });
                  }}>
                  Clear
                </Button>
              </>
            )}
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default SearchBar;
