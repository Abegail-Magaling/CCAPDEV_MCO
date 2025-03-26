const express = require("express");
const path = require("path");
const { signup, login } = require("../controllers/authController");

const router = express.Router();

router.get("/", (req, res)=>{
    res.redirect("/login");
});

router.get("/signup", (req, res)=>{
    res.render("signup");
});

router.get("/profile", (req, res)=>{
    res.sendFile(path.join(__dirname, "../public/profileUpdated.html"));
});

router.get("/login", (req, res)=>{
    res.render("login", { error: null, username: "" });
});

// router.get("/test-html", (req, res)=>{
//     res.sendFile(path.join(__dirname, "../public/test.html"));
// });

router.get("/home", (req, res)=>{
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
