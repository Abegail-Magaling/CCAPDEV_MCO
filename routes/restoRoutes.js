const express = require("express");
const path = require("path");
const router = express.Router();
const upload = require("../config/multerConfig");

const { getAllRestaurants, getRestaurantsById, addRestaurant, isAdmin } = require("../controllers/restoController");


//POST | CreateRestaurants
router.get("/eateries", getAllRestaurants);
router.get("/restaurants/:id", getRestaurantsById);
router.post("/add", isAdmin, upload.fields([
    { name: 'coverPage', maxCount: 1 },
    { name: 'restoPhotos', maxCount: 5 }]), addRestaurant);


module.exports = router;