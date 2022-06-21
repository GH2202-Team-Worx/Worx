const Sequelize = require("sequelize");
const db = require("../db");

const Product = db.define("product", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  material: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  epoxyColor: {
    type: Sequelize.ENUM(
      "red",
      "orange",
      "yellow",
      "green",
      "blue",
      "purple",
      "silver",
      "gold",
      "black",
      "white",
      "wax"
    ),
    validate: {
      notEmpty: true,
    },
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  image: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: [
      "https://scontent-mia3-1.xx.fbcdn.net/v/t39.30808-6/273447401_149490250791185_694933964468444001_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=nDEkCHoFM1wAX9O2VLw&_nc_ht=scontent-mia3-1.xx&oh=00_AT_AeIn7BPQcTd50nbE82EzRKZI6AJgzzr5ZdT1k2vHW1g&oe=6263C84E",
    ],
  },
  customizable: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
  featured: { type: Sequelize.BOOLEAN, defaultValue: false },
  quantity: { type: Sequelize.INTEGER, defaultValue: 1 },
});

module.exports = Product;
