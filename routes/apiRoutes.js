const express = require("express");
const path = require("path");
const router = express.Router();
const { getUser, logoutUser, updateUser } = require("../controllers/userController");

router.get("/profile", getUser);
router.post("/logout", logoutUser);
router.put("/update", updateUser);

module.exports = router;