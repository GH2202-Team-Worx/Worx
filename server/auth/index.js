const router = require('express').Router();
const { User } = require('../db/models');
module.exports = router;

router.post('/login', async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body) });
  } catch (err) {
    next(err);
  }
});

router.get('/me', async (req, res, next) => {
  try {
    const token = await User.findByToken(req.headers.authorization);
    console.log('tokent', token)
    res.send(token)
  } catch (ex) {
    next(ex);
  }
});
