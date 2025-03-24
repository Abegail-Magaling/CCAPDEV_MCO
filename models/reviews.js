const mongoose = require("../config/db");

const {Schema, SchemaTypes} = mongoose;

const ReviewSchema = new Schema({
    title: { 
        type: SchemaTypes.String, 
        required: true 
    },
    content: { 
        type: SchemaTypes.String, 
        required: true 
    },
    rating: { 
        type: SchemaTypes.Number, 
        required: true, 
        min: 1, 
        max: 5 
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "users", 
        required: true 
    },
    userName: {
        type: SchemaTypes.String
    },
    createdAt: { 
        type: SchemaTypes.Date, 
        default: Date.now 
    }
});

const Review = new mongoose.model("reviews", ReviewSchema);

module.exports = Review;


