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
  const [type, setType] = useState("");
  const [price, setPrice] = useState({ min: "", max: "" });
  const [surface, setSurface] = useState({ min: "", max: "" });
  const history = useHistory();
  const [update, setUpdate] = useState(false);
  const location = history.location;
  const [errors, setErrors] = useState("");
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
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
    <Container>
      <Row>
        <Col>
          <Form className={`border p-3 bg-light`} onSubmit={handleSubmit}>
            <Row className="align-items-center">
              <Row className="w-100">
                <Col className="ml-3">
                  {errors &&
                    (setTimeout(() => setErrors(""), 3000),
                    (
                      <Alert className={styles.ErrorWidth} variant="warning">
                        {errors}
                      </Alert>
                    ))}

                  <Form.Check
                    inline
                    label="rent"
                    name="sale_type"
                    type="radio"
                    id="rent"
                    onChange={() => setSaleType("rent")}
                    checked={saleType === "rent"}
                  />
                  <Form.Check
                    inline
                    label="buy"
                    name="sale_type"
                    type="radio"
                    id="sale"
                    onChange={() => setSaleType("sale")}
                    checked={saleType === "sale"}
                  />
                </Col>
              </Row>

              <Col sm={6} md={3} className="mb-3">
                <Form.Control
                  value={query ? query : ""}
                  onChange={(e) => setQuery(e.target.value)}
                  type="text"
                  placeholder="City, postcode, address"
                  className="w-100"
                  aria-label="search"
                />
              </Col>
              <Col md={2} sm={6} className="mb-3">
                <Form.Control
                  aria-label="type"
                  as="select"
                  name="type"
                  value={type ? type : ""}
                  onChange={(e) => setType(e.target.value)}
                  className="w-100"
                >
                  <option value="">Type</option>
                  <option value="apartment">Apartment</option>
                  <option value="house">House</option>
                  <option value="land">Land</option>
                  <option value="commercial">Commercial</option>
                </Form.Control>
              </Col>
              <Col lg={2} md={3} sm={6} className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  aria-label="min price"
                  type="number"
                  placeholder="Min Price"
                  min="0"
                  value={price.min ? price.min : ""}
                  onChange={(e) => setPrice({ ...price, min: e.target.value })}
                />
                <Form.Control
                  aria-label="mac price"
                  type="number"
                  placeholder="Max Price"
                  min={price.min ? price.min : "0"}
                  max="10000000"
                  value={price.max ? price.max : ""}
                  onChange={(e) => setPrice({ ...price, max: e.target.value })}
                />
              </Col>
              <Col lg={3} md={4} sm={6} className="mb-3">
                <Form.Label>
                  {type === "land" ? "Land Area" : "Floor Area"}
                </Form.Label>
                <Form.Control
                  aria-label="min surface"
                  type="number"
                  placeholder="Min m²"
                  min="0"
                  value={surface.min ? surface.min : ""}
                  onChange={(e) =>
                    setSurface({ ...surface, min: e.target.value })
                  }
                />
                <Form.Control
                  aria-label="max surface"
                  type="number"
                  placeholder="Max m²"
                  min={surface.min ? surface.min : "0"}
                  max="10000000"
                  value={surface.max ? surface.max : ""}
                  onChange={(e) =>
                    setSurface({ ...surface, max: e.target.value })
                  }
                />
              </Col>
              <Col lg={2} className="d-flex mb-3">
                <OverlayTrigger
                  placement="bottom"
                  delay={{ show: 50, hide: 300 }}
                  overlay={renderTooltip}
                >
                  <Button
                    className={`${btnStyles.Button} ${btnStyles.Bright} m-lg-auto ml-auto`}
                    type="submit"
                    variant="dark"
                    disabled={saleType ? false : true}
                  >
                    {update ? "Update" : "Search"}
                  </Button>
                </OverlayTrigger>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SearchBar;
