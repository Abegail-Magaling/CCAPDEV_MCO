const express = require("express");
const path = require("path");
const router = express.Router();
const { createReview, getReviews, deleteReview, getRestaurantReviews } = require("../controllers/reviewController");

router.post("/reviews", createReview);
router.get("/reviews", getReviews);
router.delete("/reviews/:id", deleteReview);
router.get("/reviews/:restaurantId", getRestaurantReviews);

module.exports = router;