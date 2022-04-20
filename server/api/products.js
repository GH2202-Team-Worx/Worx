const router = require('express').Router();
const { Product } = require('../db/models');
module.exports = router;

// GET /api/products
router.get('/', async (req, res, next) => {
  try {
    const allProducts = await Product.findAll();
    res.send(allProducts);
  } catch (err) {
    console.error('🥎 Unable to get all products...');
    next(err);
  }
});

// GET /api/products/:productId
router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId);
    res.send(product);
  } catch (err) {
    console.error('🏓 Unable to get single product...');
    next(err);
  }
});
