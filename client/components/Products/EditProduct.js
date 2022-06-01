import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import productReducer, { getProduct } from "../../store/singleProduct";
import { updateProduct } from "../../store/singleProduct";
import { Modal, Button, Form } from "react-bootstrap";
import "../styles/EditProduct.css";

function EditProduct(props) {
  const dispatch = useDispatch();
  const [name, setName] = useState(props.product.name);
  const [price, setPrice] = useState(props.product.price);
  const [category, setCategory] = useState(props.product.category);
  const [material, setMaterial] = useState(props.product.material);
  const [epoxyColor, setEpoxyColor] = useState(props.product.epoxyColor);
  const [description, setDescription] = useState(props.product.description);
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);

  const handleClose = (event) => {
    event.preventDefault();
    setShow(false);
    dispatch(
      updateProduct(
        {
          name,
          price,
          category,
          material,
          epoxyColor,
          description,
          customizable: props.product.customizable,
          image: props.product.image,
          featured: props.product.featured,
          quantity: props.product.quantity,
        },
        props.product.id
      )
    );
  };

  return (
    <>
      <Button
        variant="primary"
        className="edit-product-button"
        onClick={handleShow}
      >
        Edit Product
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder={name}
                autoFocus
                onChange={(e) => setName(e.target.value)}
              />
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="price"
                placeholder={price}
                autoFocus
                onChange={(e) => setPrice(e.target.value)}
              />
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="category"
                placeholder={category}
                autoFocus
                onChange={(e) => setCategory(e.target.value)}
              />
              <Form.Label>Material</Form.Label>
              <Form.Control
                type="material"
                placeholder={material}
                autoFocus
                onChange={(e) => setMaterial(e.target.value)}
              />
              <Form.Label>Epoxy Color</Form.Label>
              <Form.Control
                type="epoxyColor"
                placeholder={epoxyColor}
                autoFocus
                onChange={(e) => setEpoxyColor(e.target.value)}
              />
              {/* <Form.Label>Featured</Form.Label>
              <Form.Control
                type="featured"
                placeholder={props.product.featured}
                autoFocus
              />
              <Form.Label>Customizable</Form.Label>
              <Form.Control
                type="customizable"
                placeholder={props.product.customizable}
                autoFocus
              /> */}
              {/* <Form.Label>Image</Form.Label>
              <Form.Control
                type="image"
                placeholder={props.product.image}
                autoFocus
              /> */}
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" placeholder={description} rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleClose}
            // onSubmit={handleSubmit}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditProduct;
