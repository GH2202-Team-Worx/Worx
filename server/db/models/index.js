const db = require("../db");
const Product = require("./Product");
const Order = require("./Order");
const OrderProduct = require("./OrderProduct");
const User = require("./User");
const Review = require("./Review");

//Associations
Order.belongsToMany(Product, { through: OrderProduct });
Product.belongsToMany(Order, { through: OrderProduct });
Order.belongsTo(User);
User.hasMany(Order);
User.hasMany(Review);
Review.belongsTo(User);

module.exports = {
  db,
  Product,
  Order,
  OrderProduct,
  User,
  Review,
};
