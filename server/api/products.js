const router = require("express").Router();
const { Product } = require("../db/models");
module.exports = router;

// GET /api/products
router.get("/", async (req, res, next) => {
  //GET featured products only
  if (req.query.filter === "featured") {
    try {
      const product = await Product.findAll({
        where: {
          featured: true,
        },
      });
      res.send(product);
    } catch (err) {
      console.error("🏓 Unable to get featured products...");
      next(err);
    }
  } else {
    try {
      const allProducts = await Product.findAll();
      res.send(allProducts);
    } catch (err) {
      console.error("🥎 Unable to get all products...");
      next(err);
    }
  }
});

// GET /api/products/:productId
router.get("/:productId", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId);
    res.send(product);
  } catch (err) {
    console.error("🏓 Unable to get single product...");
    next(err);
  }
});

// POST /api/products

router.post("/", async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body);
    res.send(newProduct).status(201);
  } catch (err) {
    next(err);
  }
});

// PUT /api/products/:id

router.put("/:id", async (req, res, next) => {
  try {
    const product = await Product.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.send(await product.update(req.body));
    res.status(202);
  } catch (err) {
    next(err);
  }
});
