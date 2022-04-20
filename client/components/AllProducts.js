import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../store/products';
import SingleProduct from './SingleProduct';
import { Link } from 'react-router-dom';

//this component would show all products
{
  /* <Link to="/products/bowls">Bowls</Link>
<Link to="/products/goblets">Goblets</Link>
<Link to="/products/boards">Cutting Boards</Link>
<Link to="/products/jewleryboxes">Jewlery Boxes</Link>
<Link to="/products/misc">Misc.</Link> */
}
//Drop down menu for above to filter by categories
//Separate filter section to filter by other filters discussed

//TODO: refactor mapState and mapDispatch to hooks

const AllProducts = ({ products, loadProducts }) => {
  useEffect(() => {
    loadProducts();
  }, []);

  if (products.length === 0) return <div>Loading ...</div>;

  return (
    <div>
      {products.map((product) => {
        return (
          <div key={product.id}>
            <Link to={`/product/${product.id}`} component={SingleProduct}>
              <img src={product.image} alt={product.name} />
              <div>{`${product.name} $${product.price}`}</div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

const mapState = (state) => {
  return {
    products: state.products,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadProducts: () => dispatch(fetchProducts()),
  };
};
export default connect(mapState, mapDispatch)(AllProducts);
