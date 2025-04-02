const express = require("express");
const path = require("path");
const router = express.Router();
const upload = require("../config/multerConfig");
const { getUser, logoutUser, updateUser } = require("../controllers/userController");

router.get("/profile", getUser);
router.post("/logout", logoutUser);
router.put("/update", upload.single("profilePicture"), updateUser);

module.exports = router;