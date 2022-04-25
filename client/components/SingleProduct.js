import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProduct } from "../store/singleProduct";
import "./styles/SingleProduct.css";

const SingleProduct = (props) => {
  const dispatch = useDispatch();
  const product = useSelector((state) => {
    return state.singleProduct;
  });

  const productId = props.match.params.productId;

  useEffect(() => {
    dispatch(fetchProduct(productId));
  }, []);

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
          <button className="sp-button" type="submit">
            Add to Cart
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SingleProduct;
