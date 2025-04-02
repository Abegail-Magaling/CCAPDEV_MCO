const Restaurants = require("../models/restos");
const Review = require("../models/reviews");

const getAllRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurants.find();

        if(!restaurants){
            return res.status(404).send({
                success: false,
                message: 'No Restaurant Available'
            })
        }
        res.render("eateries", { restaurants });
    }
    catch(error){
        console.error("error fetching restos", error);
        res.status(500).json({error: "server error"});
    }
}

const getRestaurantsById = async (req, res) => {
    try{
        const restaurantID = req.params.id;
        console.log("Fetching restaurant with id: ", restaurantID);

        const restaurant = await Restaurants.findById(restaurantID);

        if (!restaurant) {
            return res.status(404).send("Restaurant Not Found!");
        }

        const reviews = await Review.find({ restaurant: req.params.id }).populate("user", "name").select( "title content rating user createdAt" );
        res.render("restaurant", { restaurant, reviews });

    }
    catch(error){
        console.error("Error fetching restaurant", error);
        res.status(500).json({error: "getIDByRestaurant: server error"});
    }
}


module.exports = { getAllRestaurants, getRestaurantsById };