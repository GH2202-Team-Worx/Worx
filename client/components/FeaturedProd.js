import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getFeatured } from '../store/products';

const FeaturedProd = () => {

  return (
    <div id ='featuredProd'>
      <h2>Featured Products here!</h2>
    </div>
  )
}

const mapDispatch = (dispatch) => {
  return {
    loadFeatured: () => dispatch(getFeatured())
  }
}

export default connect(null, mapDispatch)(FeaturedProd);
