import React, { useEffect, useMemo, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import styles from "../styles/SearchBar.module.css";
import btnStyles from "../styles/Button.module.css";

import { axiosReq } from "../api/axiosDefaults";
import { useHistory } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [saleType, setSaleType] = useState("rent");
  const [type, setType] = useState("");
  const [price, setPrice] = useState({ min: "", max: "" });
  const [surface, setSurface] = useState({ min: "", max: "" });
  const history = useHistory();
  const [update, setUpdate] = useState(false);
  const location = history.location;

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
  }, [history.location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      console.log(err);
    }
  };

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
          <Form
            className={`d-flex flex-row justify-content-between align-items-center border p-3 bg-light`}
            onSubmit={handleSubmit}
          >
            <Row>
              <Col md={12}>
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
              <Col sm={3}>
                <Form.Control
                  value={query ? query : ""}
                  onChange={(e) => setQuery(e.target.value)}
                  type="text"
                  placeholder="City, postcode, address"
                />
              </Col>
              <Col sm={3} className="my-2 m-sm-0">
                <Form.Control
                  as="select"
                  name="type"
                  value={type ? type : ""}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="">Type</option>
                  <option value="apartment">Apartment</option>
                  <option value="house">House</option>
                  <option value="land">Land</option>
                  <option value="commercial">Commercial</option>
                </Form.Control>
              </Col>
              <Col className="d-flex col-md-3 mt-4 mt-sm-0">
                <Form.Label className={`${styles.SearchBarLabel} `}>
                  Price
                </Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Min"
                  min="0"
                  value={price.min ? price.min : ""}
                  onChange={(e) => setPrice({ ...price, min: e.target.value })}
                />
                <Form.Control
                  type="number"
                  placeholder="Max"
                  max="10000000"
                  value={price.max ? price.max : ""}
                  onChange={(e) => setPrice({ ...price, max: e.target.value })}
                />
              </Col>
              <Col className="d-flex col-md-3 mt-4 mt-sm-0">
                <Form.Label className={`${styles.SearchBarLabel} `}>
                  Surface
                </Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Min"
                  min="0"
                  value={surface.min ? surface.min : ""}
                  onChange={(e) =>
                    setSurface({ ...surface, min: e.target.value })
                  }
                />
                <Form.Control
                  type="number"
                  placeholder="Max"
                  max="10000000"
                  value={surface.max ? surface.max : ""}
                  onChange={(e) =>
                    setSurface({ ...surface, max: e.target.value })
                  }
                />
              </Col>
              <Col className="col-12">
                <Button
                  className={`${btnStyles.Button} ${btnStyles.Bright} mt-2`}
                  type="submit"
                >
                  {update ? "Update" : "Search"}
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SearchBar;
