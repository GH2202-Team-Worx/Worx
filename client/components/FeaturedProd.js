import React, { useEffect } from "react";
// import { connect } from 'react-redux';
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getFeatured } from "../store/products";
import "./styles/featuredProds.css";

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
        <div className="featured-prods-container">
          {featuredProds.map((prod) => {
            return (
              <div className="featuredProd" key={prod.id}>
                <Link
                  className="featured-prods-description"
                  to={`/products/${prod.id}`}
                >
                  <img src={prod.image} alt={prod.name} />
                  <h4>{`${prod.name}`}</h4>
                </Link>
              </div>
            );
          })}
        </div>
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
