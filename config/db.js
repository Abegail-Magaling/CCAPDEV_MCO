const mongoose = require("mongoose");
require("dotenv").config();
//const connect = mongoose.connect("mongodb://localhost:27017/KarFind_DB");
const connect = mongoose.connect(process.env.MONGO_URI);

//check database connections
connect.then(()=> {
    console.log("Database connected successfully");
})
.catch(() => {
    console.log("Database cannot be connected");
});

module.exports = mongoose;