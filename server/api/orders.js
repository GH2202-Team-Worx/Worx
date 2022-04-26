const router = require("express").Router();
const { Order, OrderProduct, User, Product } = require("../db/models");
module.exports = router;

//if user is guest, front end should save the cart locally and only send to back end route "api/order/" w/ status "Processing" once order is placed.

// GET /api/orders   only avilable from admin dashboard

router.get("/", async (req, res, next) => {
  try {
    const orders = await Order.findAll();
    res.send(orders);
  } catch (err) {
    next(err);
  }
});

// GET /api/orders/:orderId  only available from admin dashboard

router.get("/:orderId", async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.orderId);
    res.send(order);
  } catch (err) {
    console.log("Unable to retrive product from database...");
    next(err);
  }
});

//save order
router.post("/", async (req, res, next) => {
  try {
    const order = await Order.create(req.body);
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
    res.send({ order, products });
  } catch (err) {
    next(err);
  }
});
//TODO: turning a "cart" into a placed order

//if user is logged in, front end should send cart data to server via "api/order/cart" with status "Cart" whenever cart is modified.

//create and add to cart
//front end should send product and order - server will find the order or create one
//returns cart and product
router.post("/cart", async (req, res, next) => {
  try {
    const [cart, created] = await Order.findOrCreate({
      where: {
        userId: req.body.userId,
        status: "Cart",
      },
      defaults: {
        status: req.body.status,
        shippingAddress: req.body.shippingAddress,
        paymentInfo: req.body.paymentInfo,
        shippingAmt: req.body.shippingAmt,
        taxAmt: req.body.taxAmt,
      },
    });
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
//front end should send userId in req.body
//returns all cart products w/o deleted one
router.delete("/cart/:productId", async (req, res, next) => {
  try {
    const cart = await Order.findOne({
      where: {
        userId: req.body.userId,
        status: "Cart",
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
//front end should send userId and updated orderProduct in req.body
//returns updated orderProduct info
router.put("/cart/:productId", async (req, res, next) => {
  try {
    const cart = await Order.findOne({
      where: {
        userId: req.body.userId,
        status: "Cart",
      },
    });
    const cartProduct = await OrderProduct.findOne({
      where: {
        orderId: cart.id,
        productId: req.body.product.id,
      },
    });
    cartProduct.gift = req.body.product.gift;
    cartProduct.customization = req.body.product.customization;
    cartProduct.sellPrice = req.body.product.sellPrice;
    cartProduct.quantity = req.body.product.quantity;
    await cartProduct.save();
    res.send(cartProduct);
  } catch (err) {
    next(err);
  }
});
