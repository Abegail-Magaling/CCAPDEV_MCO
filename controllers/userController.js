const User = require("../models/User");

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
        const updatedUser = await User.findByIdAndUpdate(req.session.user._id, 
            {name, email, password}, 
            {new : true}).select("name email password");

        console.log(updatedUser);

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        req.session.user.name = updatedUser.name;
        req.session.user.email = updatedUser.email;
        req.session.user.password = updatedUser.password;

        res.json({ message: "Profile updated successfully!", user: updatedUser });
    }
    catch (error) {
        console.error("Error in updateUser:", error);
        res.status(500).json({ error: "Server error" });
    }
}

module.exports = { getUser, logoutUser, updateUser };