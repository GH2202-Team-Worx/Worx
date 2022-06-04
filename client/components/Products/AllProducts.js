import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../store/products";
import { Link } from "react-router-dom";
import "../styles/AllProducts.css";
import Filter from "./Filter";
import MaterialColorFilter from "./MaterialColorFilter";
import { Card, Button, Container, Col, Row } from "react-bootstrap";

const AllProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const [filteredCategory, setFilteredCategory] = useState("");
  const [filteredMaterial, setFilteredMaterial] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const filterChangeHandler = (selectedCategory) => {
    setFilteredCategory(selectedCategory);
  };

  const materialChangeHandler = (selectedMaterial) => {
    setFilteredMaterial(selectedMaterial);
    console.log("HIT");
  };

  console.log("MATERIAL: ", filteredMaterial);

  const productsToShow = () => {
    let sortedArray = products;
    if (filteredCategory === "low") {
      sortedArray = products.sort((a, b) => +a.price - +b.price);
    } else if (filteredCategory === "high") {
      sortedArray = products.sort((a, b) => +b.price - +a.price);
    } else if (filteredCategory) {
      const filteredProducts = products.filter(
        (product) => product.category === filteredCategory
      );
      return filteredProducts;
    } else if (filteredMaterial) {
      const filteredProducts = products.filter(
        (product) => product.material === filteredMaterial
      );
      return filteredProducts;
    } else if (searchTerm) {
      sortedArray = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return sortedArray;
  };

  let productList = productsToShow();

  console.log("PRODS: ", productList);

  return (
    <div className="allproducts-main">
      <h3 id="allproducts-title">Our Products</h3>
      <div className="filters-div">
        <div>
          <label htmlFor="search">Search products</label>
          <input
            className="search-input"
            type="search"
            id="search"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Filter
          className="products-filter"
          selected={filteredCategory}
          onChangeFilter={filterChangeHandler}
        />
        <MaterialColorFilter
          className="products-filter"
          selected={filteredMaterial}
          onChange={(e) => setFilteredMaterial(e)}
        />
      </div>
      <Container className="allproducts-container">
        <Row>
          {productList.length === 0 ? (
            <div>There are no products to show at this time</div>
          ) : (
            productList.map((product) => {
              return (
                <Col md={4} key={product.id} className="product-container">
                  <Card className="products-card">
                    <Card.Img
                      variant="top"
                      src={product.image}
                      className="products-image"
                    />
                    <Card.Body className="products-card-body">
                      <Card.Title id="product-title">{product.name}</Card.Title>
                      <Card.Text id="product-card-price">
                        ${product.price}
                      </Card.Text>
                      <Link to={`/products/${product.id}`}>
                        <Button variant="primary" id="product-card-button">
                          See Details
                        </Button>
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })
          )}
        </Row>
      </Container>
    </div>
  );
};

export default AllProducts;
