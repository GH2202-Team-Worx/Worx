import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getProducts } from "../store/products";
import SingleProduct from "./SingleProduct";
import { Link } from "react-router-dom";
import "./styles/AllProducts.css";
import Filter from "./Filter";

//this component would show all products
{
  /* <Link to="/products/bowls">Bowls</Link>
<Link to="/products/goblets">Goblets</Link>
<Link to="/products/boards">Cutting Boards</Link>
<Link to="/products/jewleryboxes">Jewlery Boxes</Link>
<Link to="/products/misc">Misc.</Link> */
}
//Drop down menu for above to filter by categories
//Separate filter section to filter by other filters discussed

//TODO: refactor mapState and mapDispatch to hooks

const AllProducts = ({ products, loadProducts }) => {
  const [filteredCategory, setFilteredCategory] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  const filterChangeHandler = (selectedCategory) => {
    setFilteredCategory(selectedCategory);
  };

  const productsToShow = () => {
    if (filteredCategory) {
      const filteredProducts = products.filter(
        (product) => product.category === filteredCategory
      );
      return filteredProducts;
    } else {
      return products;
    }
  };

  return (
    <div className="allproducts-container">
      <div>
        <Filter
          selected={filteredCategory}
          onChangeFilter={filterChangeHandler}
        />
      </div>
      <h3 className="allproducts-title">Products</h3>
      <div className="allproducts-display">
        {productsToShow().length === 0 ? (
          <div>Loading ...</div>
        ) : (
          productsToShow().map((product) => {
            return (
              <div key={product.id}>
                <Link to={`/products/${product.id}`}>
                  <img
                    className="allproducts-image"
                    src={product.image}
                    alt={product.name}
                  />
                  <div className="allproducts-title">{`${product.name} $${product.price}`}</div>
                </Link>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

const mapState = (state) => {
  return {
    products: state.products,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadProducts: () => dispatch(getProducts()),
  };
};

export default connect(mapState, mapDispatch)(AllProducts);
