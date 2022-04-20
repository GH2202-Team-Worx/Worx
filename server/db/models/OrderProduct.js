const Sequelize = require("sequelize");
const db = require("../db");

const OrderProduct = db.define("orderproduct", {
  customization: { type: Sequelize.STRING },
  gift: { type: Sequelize.BOOLEAN, defaultValue: false },
});

module.exports = OrderProduct;
