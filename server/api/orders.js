const router = require('express').Router();
const { Order, OrderProduct, User, Product } = require('../db/models');
module.exports = router;

//if user is guest, front end saves the cart locally and only sends to back end route "api/order/" w/ status "Processing" when order is placed.

//save order
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
              quantity: prod.quantity,
            },
          })
      )
    );
    //finds and deletes that user's cart if it existed?

    res.send({ order, products });
  } catch (err) {
    next(err);
  }
});

//if user is logged in, front end sends cart data to server via "api/order/cart" with status "Cart" whenever cart is modified.

//create and add to cart
router.post('/cart', async (req, res, next) => {
  try {
    //find or create cart
    const [cart, created] = await Order.findOrCreate({
      where: {
        userId: req.body.userId,
        status: 'Cart',
      },
      defaults: {
        status: req.body.status,
        shippingAddress: req.body.shippingAddress,
        paymentInfo: req.body.paymentInfo,
        shippingAmt: req.body.shippingAmt,
        taxAmt: req.body.taxAmt,
      },
    });
    // adds product to the cart
    const prod = req.body.product;
    const product = await cart.addProduct(prod.id, {
      through: {
        orderId: cart.id,
        productId: prod.id,
        customization: prod.customization,
        sellPrice: prod.sellPrice,
        gift: prod.gift,
      },
    });
    res.send({ cart, product });
  } catch (err) {
    next(err);
  }
});

//remove item from cart
//send userId in req.body
router.delete('/cart/:productId', async (req, res, next) => {
  try {
    const cart = await Order.findOne({
      where: {
        userId: req.body.userId,
        status: 'Cart',
      },
    });
    cart.removeProduct(req.params.productId);
    const cartProds = await cart.getProducts();
    res.send(cartProds);
  } catch (err) {
    next(err);
  }
});

//update items in cart
//send userId in req.body
router.put('/cart/:productId', async (req, res, next) => {
  try {
    const cart = await Order.findOne({
      where: {
        userId: req.body.userId,
        status: 'Cart',
      },
    });
    cart.removeProduct(req.params.productId);
    res.send(cart);
  } catch (err) {
    next(err);
  }
});
