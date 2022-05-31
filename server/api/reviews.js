const router = require("express").Router();
const Review = require("../db/models/Review");

module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const allReviews = await Review.findAll();
    res.send(allReviews);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    await reviews.create(req.body);
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
});
