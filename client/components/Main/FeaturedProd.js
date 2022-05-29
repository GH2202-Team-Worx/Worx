import React, { useEffect } from "react";
// import { connect } from 'react-redux';
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getFeatured } from "../../store/products";
import { Card, Button, Row, Col, Container } from "react-bootstrap";
import "../styles/featuredProds.css";

const FeaturedProd = () => {
  const dispatch = useDispatch();
  const featuredProds = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(getFeatured());
  }, []);

  return (
    <>
      <div id="featuredProds">
        <h2 className="featured-products-title">Featured Products</h2>
        <Container className="featured-prods-container">
          <Row>
            {featuredProds.map((prod) => {
              return (
                <Col className="featuredProd" key={prod.id}>
                  <Link to={`/products/${prod.id}`}>
                    <Card className="featured-card">
                      <Card.Body>
                        <Card.Title className="featured-prod-name">
                          {prod.name}
                        </Card.Title>
                        <Card.Img
                          variant="top"
                          src={prod.image}
                          id="featured-prod-image"
                        />
                      </Card.Body>
                    </Card>
                  </Link>
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>
    </>
  );
};

// const mapState = (state) => {
//   return {
//     featuredProds: state.products,
//   };
// };

// const mapDispatch = (dispatch) => {
//   return {
//     loadFeatured: () => dispatch(getFeatured()),
//   };
// };

// export default connect(mapState, mapDispatch)(FeaturedProd);
export default FeaturedProd;
