import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../store/products';
// import SingleProduct from './SingleProduct';
import { Link } from 'react-router-dom';
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
    <div>
      <div>
        <Filter
          selected={filteredCategory}
          onChangeFilter={filterChangeHandler}
        />
      </div>
      {productsToShow().length === 0 ? (
        <div>There are no products to show at this time</div>
      ) : (
        productsToShow().map((product) => {
          return (
            <div key={product.id}>
              <Link to={`/products/${product.id}`}>
                <img src={product.image} alt={product.name} />
                <div>{`${product.name} $${product.price}`}</div>
              </Link>
            </div>
          );
        })
      )}
    </div>
  );
};

export default AllProducts;
