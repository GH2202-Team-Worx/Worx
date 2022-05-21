import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../store/products";
import { Link } from "react-router-dom";
import "./styles/AllProducts.css";
import Filter from "./Filter";
import MaterialColorFilter from "./MaterialColorFilter";
import { Card, Button, Container, Col, Row } from "react-bootstrap";

const AllProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const [filteredCategory, setFilteredCategory] = useState("");
  const [filteredMaterial, setFilteredMaterial] = useState("");

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
  // need to separate out price filter
  // have material && category filters work together
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
    }
    return sortedArray;
  };

  return (
    <div className="allproducts-main">
      <h3 className="allproducts-title">All Products</h3>
      <div className="filters-div">
        <Filter
          className="products-filter"
          selected={filteredCategory}
          onChangeFilter={filterChangeHandler}
        />
        {/* <MaterialColorFilter
          className="products-filter"
          selected={filteredMaterial}
          onChange={materialChangeHandler}
        /> */}
      </div>
      <Container className="allproducts-container">
        <Row>
          {productsToShow().length === 0 ? (
            <div>There are no products to show at this time</div>
          ) : (
            productsToShow().map((product) => {
              return (
                // <div className="product-container" key={product.id}>
                <Col md={3} key={product.id} className="product-container">
                  <Card className="products-card">
                    <Card.Img
                      variant="top"
                      src={product.image}
                      className="products-image"
                    />
                    <Card.Body className="products-card-body">
                      <Card.Title>
                        {product.name} {product.price}
                      </Card.Title>
                      <Card.Text>Material: {product.material}</Card.Text>
                      <Link to={`/products/${product.id}`}>
                        <Button
                          variant="primary"
                          className="product-card-button"
                        >
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
