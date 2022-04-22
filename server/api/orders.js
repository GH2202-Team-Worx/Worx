const router = require('express').Router();
const { Order, OrderProduct } = require('../db/models');
module.exports = router;

router.post('/', async (req, res, next) => {
  console.log('req body: ', req.body)
  try {
    const order = await Order.create(req.body);
    const prods = await req.body.products.map((prod) =>
      OrderProduct.create({ orderId: order.id, productId: prod.id })
    );
    order.products = prods;
    res.send(order);
  } catch (err) {
    next(err);
  }
});
