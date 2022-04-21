import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getFeatured } from '../store/products';
import './styles/featuredProds.css';

const FeaturedProd = ({ featuredProds, loadFeatured }) => {
  useEffect(() => {
    loadFeatured();
  }, []);

  return (
    <>
      <h2>Featured Products:</h2>
      <div id="featuredProds">
        {featuredProds.map((prod) => {
          return (
            <div className="featuredProd" key={prod.id}>
              <Link to={`/products/${prod.id}`}>
                <img src={prod.image} alt={prod.name} />
                <h4>{`${prod.name}`}</h4>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

const mapState = (state) => {
  return {
    featuredProds: state.products,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadFeatured: () => dispatch(getFeatured()),
  };
};

export default connect(mapState, mapDispatch)(FeaturedProd);
