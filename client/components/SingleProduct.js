import React, { useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProduct } from '../store/singleProduct';

const SingleProduct = (props) => {
  const dispatch = useDispatch()
  const product = useSelector((state) => {
    return state.singleProduct
  })

  const productId = props.match.params.productId;

  useEffect(() => {
    dispatch(fetchProduct(productId));
  }, []);

  if (!product) {
    return <div>Loading...</div>
  }
  return (<React.Fragment>
    <img src={product.image} alt={product.name} />
    <div>{product.name}</div>
    <div>{product.price}</div>
    <div>{product.material} {product.epoxyColor}</div>
    <div>{product.description}</div>
    <button type= 'submit'>Add to Cart</button>
  </React.Fragment>);
};

export default SingleProduct;
