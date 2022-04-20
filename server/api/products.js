const router = require('express').Router();
const { Product } = require('../db');
module.exports = router;

// GET /api/products
router.get('/', async (req, res, next) => {
  try {
    const allProducts = await Product.findAll();
    res.send(allProducts);
  } catch (err) {
    console.error('Unable to get all products...');
    next(err);
  }
});
