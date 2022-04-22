const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('Cart', 'Processing', 'Completed'),
  },
  shipping: {
    type: Sequelize.DECIMAL(10, 2),
    // allowNull: false,
    // validate: {
    //   notEmpty: true,
    // },
  },
  tax: {
    type: Sequelize.DECIMAL(10, 2),
    // allowNull: false,
    // validate: {
    //   notEmpty: true,
    // },
  },
});

module.exports = Order;
