const Sequelize = require("sequelize");
const db = require("../db");

const Order = db.define("order", {
  status: {
    type: Sequelize.ENUM("Cart", "Processing", "Completed"),
  },
});

module.exports = Order;
