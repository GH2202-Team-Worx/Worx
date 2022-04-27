const router = require('express').Router()
const { User } = require('../db/models')
const Order = require('../db/models/Order')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  // if admin, can make new person admin, if not admin can not set self/newperson to admin
  try {
    await User.create(req.body)
    res.sendStatus(201)
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.id
      }
    })
    res.send(await user.update(req.body))
    res.status(202)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    console.log("userId for orders", req.params.id)
    const userOrders = await Order.findAll({
      where: {
        userId: req.params.id
      }
    })
    console.log("retrieved orders for user", userOrders)
    res.send(userOrders)
  } catch (err) {
    next(err)
  }
})
