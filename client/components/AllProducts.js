import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../store/products';
import { Link } from 'react-router-dom';
import './styles/AllProducts.css';
import Filter from './Filter';

const AllProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const [filteredCategory, setFilteredCategory] = useState('');

  useEffect(() => {
    dispatch(getProducts());
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
          <div>There are no products to show at this time</div>
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

export default AllProducts;
