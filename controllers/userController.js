const User = require("../models/User");
const bcrypt = require("bcrypt");

const getUser = async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ error: "User not logged in" });
    }

    res.json(req.session.user);
}

const logoutUser = async (req, res) =>{
    req.session.destroy((err) => {
        if(err){
            return res.status(500).send("Error logging out!");
        }
        res.redirect("/login");

    });

}

const updateUser = async (req, res) => {
    if(!req.session.user){
        return res.status(401).json({error : "User not logged in!"});
    }

    try {
        const {name, email, password} = req.body;

        //added
        const updates = { name, email };

        //hash the new password entered
        if(password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updates.password = hashedPassword;
        }

        //handle profile picture changes
        if(req.file){
            updates.profilePicture = `/uploads/${req.file.filename}`;
        }

        const updatedUser = await User.findByIdAndUpdate(req.session.user._id, 
            updates, 
            {new : true}).select("name email profilePicture");

        console.log(updatedUser);

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        req.session.user.name = updatedUser.name;
        req.session.user.email = updatedUser.email;

        if(password) {
            req.session.user.password = updatedUser.password;
        }

        if(req.file){
            req.session.user.profilePicture = updatedUser.profilePicture;
        }
        res.json({ message: "Profile updated successfully!", user: updatedUser, profilePicture: updatedUser.profilePicture });
    }
    catch (error) {
        console.error("Error in updateUser:", error);
        res.status(500).json({ error: "Server error" });
    }
}

module.exports = { getUser, logoutUser, updateUser };