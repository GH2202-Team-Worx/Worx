import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { createProduct } from "../store/products";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [material, setMaterial] = useState("");
  const [image, setImage] = useState("");
  const [epoxyColor, setEpoxyColor] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [customizable, setCustomizable] = useState(true);
  const [featured, setFeatured] = useState(false);
  const [quantity, setQuantity] = useState(0);

  const handleNameChange = (e) => setName(e.target.value);

  const handleDescriptionChange = (e) => setDescription(e.target.value);

  const handleMaterialChange = (e) => setMaterial(e.target.value);

  const handleEpoxyColorChange = (e) => setEpoxyColor(e.target.value);

  const handleCustomizableChange = (e) => setCustomizable(e.target.value);

  const handleFeaturedChange = (e) => setFeatured(e.target.value);

  const handlePriceChange = (e) => setPrice(e.target.value);

  const handleCategoryChange = (e) => setCategory(e.target.value);

  const handleQuantityChange = (e) => setQuantity(e.target.value);

  const handleImageChange = (e) => setImage(e.target.value);

  const handleSubmit = (event) => {

    event.preventDefault();
    console.log("is this working?");
    //console.log('newProduct quant', newProduct)
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
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <h2>Add a Product:</h2>
          <label htmlFor="name">Name: </label>
          <input
            value={name}
            type="text"
            required
            onChange={handleNameChange}
          />
          <label htmlFor="description">Description: </label>
          <input
            value={description}
            type="text"
            required
            onChange={handleDescriptionChange}
          />
          <label htmlFor="material">Material: </label>
          <input
            value={material}
            type="text"
            required
            onChange={handleMaterialChange}
          />
          <label htmlFor="epoxyColor">Epoxy Color: </label>
          <input
            value={epoxyColor}
            type="text"
            required
            onChange={handleEpoxyColorChange}
          />
          <label htmlFor="price">Price: </label>
          <input
            value={price}
            type="text"
            required
            onChange={handlePriceChange}
          />
          <label htmlFor="category">Category: </label>
          <input
            value={category}
            type="text"
            required
            onChange={handleCategoryChange}
          />
          <label htmlFor="image">Image: </label>
          <input
            value={image}
            type="text"
            required
            onChange={handleImageChange}
          />
          <label htmlFor="customizable">Customizable: </label>
          <input
            value={customizable}
            type="text"
            required
            onChange={handleCustomizableChange}
          />
          <label htmlFor="featured">Featured: </label>
          <input
            value={featured}
            type="text"
            required
            onChange={handleFeaturedChange}
          />
          <label htmlFor="quantity">Quantity: </label>
          <input
            value={quantity}
            type="text"
            required
            onChange={handleQuantityChange}
          />
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
      <div>
        <Link to="/orders">
          <button>View All Orders</button>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;

