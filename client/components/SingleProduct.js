import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProduct } from '../store/singleProduct';
import { _addProduct, addProduct } from '../store/cart';

const SingleProduct = (props) => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.singleProduct);
  const currentCart = useSelector((state) => state.cartReducer);
  const isLoggedIn = useSelector((state) => !!state.auth.id);

  console.log('CURRENT CART: ', currentCart);
  console.log('PRODUCT: ', product);

  const productId = props.match.params.productId;

  useEffect(() => {
    dispatch(getProduct(productId));
  }, []);

  //I added some ternary logic here to see if this is a guest/logged in (based on how it was done in the NavBar). If logged in, addProduct through thunk. If not, _addProduct through action creator so that it doesn't persist in the db.
  const handleAddToCart = () => {
    isLoggedIn ? dispatch(addProduct(product)) : dispatch(_addProduct(product));
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <React.Fragment>
      <img src={product.image} alt={product.name} />
      <div>{product.name}</div>
      <div>{`$${product.price}`}</div>
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
