const Sequelize = require("sequelize");
const db = require("../db");

const Order = db.define("order", {
  totalPrice: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
  status: {
    type: Sequelize.ENUM("Available", "Processing", "Completed", "Shipped"),
  },
});

module.exports = Order;
