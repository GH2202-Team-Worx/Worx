const Sequelize = require('sequelize')
const db = require('../db')

const reviews = db.define('review', {
  name: {
    type: Sequelize.STRING,
    allowNull: true
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true
  },
})

module.exports = reviews
