const Sequelize = require('sequelize');
const db = require('../db');

const OrderProduct = db.define('orderproduct', {
  customization: { type: Sequelize.STRING },
  gift: { type: Sequelize.BOOLEAN, defaultValue: false },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    // allowNull: false,
    // validate: {
    //   notEmpty: true,
    // },
  },
  quantity: { type: Sequelize.INTEGER, defaultValue: 1 },
});


module.exports = OrderProduct;
