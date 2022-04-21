//TODO: add to cart button

import React, { useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProduct } from '../store/singleProduct';

const SingleProduct = (props) => {
  const dispatch = useDispatch()
  const product = useSelector((state) => {
    return state.product
  })
  const productId = props.match.params.productId;
  useEffect(() => {
    dispatch(fetchProduct(productId));
  }, []);

  return <React.Fragment>{product.name}</React.Fragment>;
};


export default SingleProduct;
