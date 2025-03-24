const mongoose = require("../config/db")

const {Schema, SchemaTypes} = mongoose;

//create a schema
const UserSchema = new Schema({
    name : {
        type: SchemaTypes.String,
        required: true
    },
    email : {
        type : SchemaTypes.String,
        required: true
    },
    password : {
        type: SchemaTypes.String,
        required: true
    },
    userType : {
        type: SchemaTypes.String,
        enum: ["user", "admin"],
        default: "user"
    }

});

const User = new mongoose.model("users", UserSchema);

module.exports = User;