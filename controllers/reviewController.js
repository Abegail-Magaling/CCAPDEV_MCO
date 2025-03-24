const Review = require("../models/reviews");
const User = require("../models/User");

const getReviews = async (req, res) => {
    console.log("Session data:", req.session);
    try {
        const reviews = await Review.find().populate("user", "_id name").select("title content rating user createdAt");
        console.log("Fetched reviews:", reviews);
        res.json(reviews);
        
    } catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).json({ error: "Server error" });
    }
}

const createReview = async (req, res) => {
    if(!req.session.user){
        return res.status(401).json({error: "FROM CREATE REVIEW: USER NOT LOGGED IN! "});
    }

    try{
        const data = new Review ({
            title: req.body.title,
            content: req.body.content,
            rating: req.body.rating,
            user: req.session.user._id,
            userName: req.session.user.name,
            createdAt: new Date()
        });

        let newReview = await Review.create(data);
        newReview = await newReview.populate("user", "name");
        console.log("User:", req.session.user.name, "created review:", newReview);
        res.status(201).json({ message: "Review posted!", review: newReview});
    }
    catch (error) {
        console.error("Error creating review:", error);
        res.status(500).json({ error: "Server error" });
    }
}

const deleteReview = async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ error: "User not logged in" });
    }

    try {
        const review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ error: "Review not found" });
        }

        // Check if the logged-in user is the owner of the review
        if (review.user.toString() !== req.session.user._id) {
            return res.status(403).json({ error: "You can only delete your own reviews!" });
        }

        await Review.findByIdAndDelete(req.params.id);
        res.json({ message: "Review deleted successfully" });

    } catch (error) {
        console.error("Error deleting review:", error);
        res.status(500).json({ error: "Server error" });
    }
};

module.exports = { createReview, getReviews, deleteReview };

