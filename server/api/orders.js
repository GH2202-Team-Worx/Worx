const router = require('express').Router();
const { Order, OrderProduct } = require('../db/models');
module.exports = router;

router.post('/', async ( req, res, next) => {
  try{
    const order = await OrderProduct.create(req.query);
    console.log('req query is: ',req.query)
    res.send(order)
  } catch (err) {
    next(err)
  }
})
