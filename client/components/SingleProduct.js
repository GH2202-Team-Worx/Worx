//TODO: add to cart button

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchProduct } from '../store/singleProduct';

const SingleProduct = (props) => {
  const { product, loadProduct } = props;
  const productId = props.match.params.productId;
  useEffect(() => {
    loadProduct(productId);
  }, []);

  return <h1>SINGLE PRODUCT</h1>;
};

const mapState = (state) => {
  return {
    product: state.product,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadProduct: (productId) => dispatch(fetchProduct(productId)),
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);
