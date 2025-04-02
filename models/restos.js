const mongoose = require("../config/db");

const {Schema, SchemaTypes} = mongoose;

const RestoSchema = new Schema({
    name: {
        type: SchemaTypes.String,
        required: true
    },
    rating: {
        type: SchemaTypes.Number,
        min: 1,
        max: 5
    },
    description: {
        type: SchemaTypes.String,
        required: true
    },
    address: {
        type: SchemaTypes.String,
        required: true
    },
    contact: {
        type: SchemaTypes.String,
        required: true
    },
    googleMap: {
        type: SchemaTypes.String,
    },
    cuisine: {
        type: SchemaTypes.String,
        require: true
    },
    coverPage: {
        type: SchemaTypes.String,
        require: true
    },
    restoPhotos: {
        type: [SchemaTypes.string],
        require: true
    }
});

const Restaurants = new mongoose.model("restos", RestoSchema);

module.exports = Restaurants;