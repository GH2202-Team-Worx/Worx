import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProduct } from '../store/singleProduct';

const SingleProduct = (props) => {
  const dispatch = useDispatch();
  const product = useSelector((state) => {
    return state.singleProduct;
  });

  const currentCart = useSelector((state) => {
    return state.cartReducer;
  });

  console.log('CURRENT CART: ', currentCart);
  console.log('PRODUCT: ', product);

  const productId = props.match.params.productId;

  useEffect(() => {
    dispatch(getProduct(productId));
  }, []);

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_PRODUCT', payload: product });
  };

  if (!product) {
    return <div>Loading...</div>;
  }
  return (
    <React.Fragment>
      <img src={product.image} alt={product.name} />
      <div>{product.name}</div>
      <div>{product.price}</div>
      <div>
        {product.material} {product.epoxyColor}
      </div>
      <div>{product.description}</div>
      <button onClick={handleAddToCart} type="button">
        Add to Cart
      </button>
    </React.Fragment>
  );
};

export default SingleProduct;
