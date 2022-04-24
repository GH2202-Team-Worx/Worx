import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProduct } from '../store/singleProduct';
import { addProduct } from '../store/cart';

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

  //I think we have to add some ternary logic here to see if this is a guest/logged in. if logged in addproduct. if not just go straight to the action creator so that it doesn't persist in the db. this may mean that backend should only return the product and not the whole cart, because then the reducer can do the job of adding it all together for both
  const handleAddToCart = () => {
    dispatch(addProduct(product));
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
