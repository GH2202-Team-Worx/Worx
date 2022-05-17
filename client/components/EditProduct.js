import React, { useEffect } from "react";
import { getProduct } from "../store/singleProduct";

const EditProduct = (props) => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.singleProduct);

  const productId = props.match.params.productId;

  // useEffect(() => {
  //   dispatch(getProduct(productId));
  // }, []);
};

export default EditProduct;
