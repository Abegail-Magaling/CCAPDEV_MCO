const User = require("../models/User")

const signup = async (req, res) => {
    console.log("Request Body:", req.body);

    const existingUser = await User.findOne({email: req.body.email});
 
    if(existingUser){
        return res.send("User already exists! Please choose a different username.");
    }

    const data = {
        name: req.body.username,
        email: req.body.email,
        password: req.body.password
    }

    const newUser = await User.create(data);
    console.log("User:", newUser, "created");
    return res.redirect("/");
}

const login = async(req, res) => {
    try{
        const check = await User.findOne({ name: req.body.username });

        if (!check) {
            return res.render("login", { error: "Username cannot be found.", username});
        }

        // Directly compare plaintext passwords
        if (check.password !== req.body.password) {
            return res.render("login", { error: "Incorrect password.", username });
        }

        req.session.user = {
            _id : check._id.toString(),
            name : check.name, 
            email: check.email,
            password: check.password,
            userType: check.userType};
        res.redirect("/profile");
        //res.redirect("/eateries");

    } catch (error) {
        console.error("Login Error:", error); // Log the actual error
        res.render("login", { error: "An error occurred. Please try again later.", username: req.body.username || "" });
    }
}

module.exports = {signup, login};