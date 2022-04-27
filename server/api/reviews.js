const router = require('express').Router()
const reviews = require('../db/models/reviews')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const allReviews = await reviews.findAll()
    res.send(allReviews)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    await reviews.create(req.body)
    res.sendStatus(201)
  } catch (err) {
    next(err)
  }
})
