const express = require("express");
const path = require("path");
const router = express.Router();
const { getAllRestaurants, getRestaurantsById } = require("../controllers/restoController");


//POST | CreateRestaurants
router.get("/eateries", getAllRestaurants);
router.get("/restaurants/:id", getRestaurantsById);


module.exports = router;