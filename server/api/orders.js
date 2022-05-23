const router = require("express").Router();
const { Order, OrderProduct, User, Product } = require("../db/models");
module.exports = router;

const stripe = require("stripe")(
  "sk_test_51KsV0OFre9FhvB1NlvzO4wwWGcZewRVasAQWN2tMHYXWai1DuUKgtjqvQ02W2HP4WE9V8rNOCbHPUbTjyiBCFtMP00qlnXLZnJ"
);

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
  console.log("API route HIT!");
  try {
    const order = await Order.findByPk(req.params.orderId);
    res.send(order);
  } catch (err) {
    console.log("Unable to retrive product from database...");
    next(err);
  }
});

// PUT /api/orders/:orderId    update an order from admin dashboard

router.put("/:orderId", async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        id: req.params.orderId,
      },
    });
    res.send(await order.update(req.body));
    res.status(202);
  } catch (err) {
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
              price: prod.price,
              gift: prod.gift,
              quantity: prod.quantity,
              name: prod.name,
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
//front end should send product and userId - server will find the order or create one
//returns updated orderProduct
router.post("/cart", async (req, res, next) => {
  try {
    const [cart] = await Order.findOrCreate({
      where: {
        userId: req.body.userId,
        status: "Cart",
      },
      defaults: {
        status: req.body.status,
      },
    });
    const prod = req.body.product;
    const product = await cart.addProduct(prod.id, {
      through: {
        orderId: cart.id,
        productId: prod.id,
        customization: prod.customization,
        price: prod.price,
        gift: prod.gift,
      },
    });
    // console.log('product from db', product)
    res.send(product);
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
    res.sendStatus(204);
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

    const editedProd = req.body.product.orderproduct;

    cartProduct.gift = editedProd.gift;
    cartProduct.customization = editedProd.customization;
    cartProduct.price = editedProd.price;
    cartProduct.quantity = editedProd.quantity;
    await cartProduct.save();
    res.send(cartProduct);
  } catch (err) {
    next(err);
  }
});

//stripe route
router.post("/create-payment-intent", async (req, res, next) => {
  // Create a PaymentIntent with the order amount and currency
  try {
    //this can be taken out and amount can be req.body.cartTotal once db is adjusted to multiple everything by 100 (stripe does not include the decimals)
    const amount = req.body.cartTotal * 100;
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
    });
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    next(err);
  }
});
