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
    const data = await Review.create(req.body);
    res.send(data).status(201);
  } catch (err) {
    next(err);
  }
});
