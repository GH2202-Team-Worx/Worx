import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProduct } from "../../store/singleProduct";
import { _addProduct, addProduct } from "../../store/cart";
import EditProduct from "./EditProduct";
import { Carousel } from "react-bootstrap";
import "../styles/SingleProduct.css";

const SingleProduct = (props) => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.singleProduct);
  const auth = useSelector((state) => state.auth);
  const isLoggedIn = useSelector((state) => !!state.auth.id);
  const [pic1, setPic1] = useState("");
  const [pic2, setPic2] = useState("");
  const [pic3, setPic3] = useState("");
  const [pic4, setPic4] = useState("");
  const [mainPic, setMainPic] = useState(pic1);

  const productId = props.match.params.productId;

  // let slider = tns({
  //   container: ".my-slider",
  //   slideBy: 1,
  // });

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

  useEffect(() => {
    if (product.image) {
      setPic1(product.image[0]);
      setPic2(product.image[1]);
      setPic3(product.image[2]);
      setPic4(product.image[3]);
      setMainPic(product.image[0]);
    }
  }, [product]);

  const sliderUp = () => {
    setPic1(pic2);
    setPic2(pic3);
    setPic3(pic4);
    setPic4(pic1);
  };

  const sliderDown = () => {
    setPic1(pic4);
    setPic2(pic1);
    setPic3(pic2);
    setPic4(pic3);
  };

  return (
    <div>
      {!product ? (
        <p>Loading</p>
      ) : (
        <React.Fragment>
          <div className="single-product-container">
            <div id="slider">
              <section id="slider">
                <div className="side-container">
                  <div className="subcontainer">
                    <div className="slider-wrapper">
                      <div className="controller">
                        <div id="controls">
                          <button
                            className="previous"
                            type="button"
                            onClick={sliderUp}
                          >
                            <i className="fa-solid fa-angle-up"></i>
                          </button>
                          <button
                            className="next"
                            type="button"
                            onClick={sliderDown}
                          >
                            <i className="fa-solid fa-angle-down"></i>
                          </button>
                        </div>
                      </div>
                      <div className="my-slider">
                        <div>
                          <div className="slide">
                            <div className="slide-img img-1">
                              <img
                                src={pic1}
                                alt="pic1"
                                className="sp-image"
                                onClick={() => setMainPic(pic1)}
                              />
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="slide">
                            <div className="slide-img img-2">
                              <img
                                src={pic2}
                                alt="pic2"
                                className="sp-image"
                                onClick={() => setMainPic(pic2)}
                              />
                            </div>
                            <div className="slide-img img-3">
                              <img
                                src={pic3}
                                alt="pic3"
                                className="sp-image"
                                onClick={() => setMainPic(pic3)}
                              />
                            </div>
                            <div className="slide-img img-4">
                              <img
                                src={pic4}
                                alt="pic4"
                                className="sp-image"
                                onClick={() => setMainPic(pic4)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <div>
              <img src={mainPic} alt="main-pic" className="main-pic" />
            </div>

            <div className="sp-overview">
              <div className="sp-title">{product.name}</div>
              <div className="sp-price">${product.price}</div>
              <div className="sp-material">
                Material: {product.material} {product.epoxyColor}
              </div>
              <div className="sp-description">{product.description}</div>
              <p className="sp-shipping">
                Shipping Information: Please allow 3-5 business days for
                shipping after the product is completed.
              </p>
              <button
                className="sp-button"
                type="button"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
              {auth.isAdmin === true ? <EditProduct product={product} /> : null}
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default SingleProduct;
