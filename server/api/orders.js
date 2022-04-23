const router = require('express').Router();
const { Order, OrderProduct, User, Product } = require('../db/models');
module.exports = router;

//for cart: user can only have 1 "Cart" order

router.post('/', async (req, res, next) => {
  try {
    //creates an order
    const order = await Order.create(req.body);
    //adds products to the order
    const products = await Promise.all(
      req.body.products.map(
        async (prod) =>
          await order.addProduct(prod.id, {
            through: {
              orderId: order.id,
              productId: prod.id,
              customization: prod.customization,
              sellPrice: prod.sellPrice,
              gift: prod.gift,
            },
          })
      )
    );

    res.send({ order, products });
  } catch (err) {
    next(err);
  }
});
