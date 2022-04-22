const Sequelize = require("sequelize");
const db = require("../db");

const OrderProduct = db.define("orderproduct", {
  customization: { type: Sequelize.STRING },
  gift: { type: Sequelize.BOOLEAN, defaultValue: false },
  sellPrice: {type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      notEmpty: true,
    },}
});

module.exports = OrderProduct;
