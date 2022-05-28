import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProduct } from "../store/singleProduct";
import { _addProduct, addProduct } from "../store/cart";
import EditProduct from "./EditProduct";
import "./styles/SingleProduct.css";

const SingleProduct = (props) => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.singleProduct);
  const auth = useSelector((state) => state.auth);
  //const currentCart = useSelector((state) => state.cartReducer);
  const isLoggedIn = useSelector((state) => !!state.auth.id);

  const productId = props.match.params.productId;

  console.log("STATUS: ", auth.isAdmin);

  useEffect(() => {
    dispatch(getProduct(productId));
  }, []);

  //I added some ternary logic here to see if this is a guest/logged in (based on how it was done in the NavBar). If logged in, addProduct through thunk. If not, _addProduct through action creator so that it doesn't persist in the db.
  const handleAddToCart = () => {
    isLoggedIn
      ? dispatch(addProduct(auth.id, product))
      : dispatch(_addProduct(product));
    localStorage.setItem(`${product.id}`, JSON.stringify(product));
  };

  if (!product) {
    return <div>Loading...</div>;
  }
  return (
    <React.Fragment>
      <div className="single-product-container">
        <img className="sp-image" src={product.image} alt={product.name} />
        <div className="sp-overview">
          <div className="sp-title">{product.name}</div>
          <div className="sp-price">${product.price}</div>
          <div className="sp-material">
            Material: {product.material} {product.epoxyColor}
          </div>
          <div className="sp-description">{product.description}</div>
          <p className="sp-shipping">
            Shipping Information: Please allow 3-5 business days for shipping
            after the product is completed.
          </p>
          <button className="sp-button" type="button" onClick={handleAddToCart}>
            Add to Cart
          </button>
          {auth.isAdmin === true ? <EditProduct product={product} /> : null}
        </div>
      </div>
    </React.Fragment>
  );
};

export default SingleProduct;
