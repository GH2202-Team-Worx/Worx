import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createProduct } from "../../store/products";
import { getProducts } from "../../store/products";
import AdminDashboard from "./AdminDash";
import "../styles/AdminDash.css";
import "../styles/AdminProducts.css";

const AdminProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [material, setMaterial] = useState("");
  const [image, setImage] = useState("");
  const [epoxyColor, setEpoxyColor] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [customizable, setCustomizable] = useState(true);
  const [featured, setFeatured] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      createProduct({
        name,
        description,
        material,
        epoxyColor,
        price,
        category,
        image,
        customizable,
        featured,
        quantity,
      })
    );
  };

  return (
    <div className="admin-product-container">
      <AdminDashboard />
      <div className="admin-product-content">
        <div className="product-form">
          <form onSubmit={handleSubmit}>
            <h2>Add a Product:</h2>
            <label htmlFor="name">Name: </label>
            <input
              value={name}
              type="text"
              required
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="description">Description: </label>
            <input
              value={description}
              type="text"
              required
              onChange={(e) => setDescription(e.target.value)}
            />
            <label htmlFor="material">Material: </label>
            <input
              value={material}
              type="text"
              required
              onChange={(e) => setMaterial(e.target.value)}
            />
            <label htmlFor="epoxyColor">Epoxy Color: </label>
            <input
              value={epoxyColor}
              type="text"
              required
              onChange={(e) => setEpoxyColor(e.target.value)}
            />
            <label htmlFor="price">Price: </label>
            <input
              value={price}
              type="text"
              required
              onChange={(e) => setPrice(e.target.value)}
            />
            <label htmlFor="category">Category: </label>
            <input
              value={category}
              type="text"
              required
              onChange={(e) => setCategory(e.target.value)}
            />
            <label htmlFor="image">Image: </label>
            <input
              value={image}
              type="text"
              required
              onChange={(e) => setImage(e.target.value)}
            />
            <label htmlFor="customizable">Customizable: </label>
            <input
              value={customizable}
              type="text"
              required
              onChange={(e) => setCustomizable(e.target.value)}
            />
            <label htmlFor="featured">Featured: </label>
            <input
              value={featured}
              type="text"
              required
              onChange={(e) => setFeatured(e.target.value)}
            />
            <label htmlFor="quantity">Quantity: </label>
            <input
              value={quantity}
              type="text"
              required
              onChange={(e) => setQuantity(e.target.value)}
            />
            <div>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>

        <div>
          <div className="admin-allprods-container">
            {products.length === 0 ? (
              <p>No products to display</p>
            ) : (
              products.map((product) => {
                return (
                  <div key={product.id}>
                    <Link to={`/products/${product.id}`}>
                      <img
                        className="allproducts-image"
                        src={product.image}
                        alt={product.name}
                      />
                      <div className="allproducts-title">{`${product.name} `}</div>
                      <div className="allproducts-title">{`$${product.price}`}</div>
                    </Link>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
