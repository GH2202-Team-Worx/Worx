const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('Cart', 'Processing', 'Completed'),
  },
  shippingName: Sequelize.STRING,
  shippingAddress: Sequelize.STRING,
  paymentInfo: Sequelize.STRING,
  shippingAmt: {
    type: Sequelize.DECIMAL(10, 2),
    // allowNull: false,
    // validate: {
    //   notEmpty: true,
    // },
  },
  taxAmt: {
    type: Sequelize.DECIMAL(10, 2),
    // allowNull: false,
    // validate: {
    //   notEmpty: true,
    // },
  },
});

module.exports = Order;
