const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://localhost:27017/KarFind_DB");

//check database connections
connect.then(()=> {
    console.log("Database connected successfully");
})
.catch(() => {
    console.log("Database cannot be connected");
});

module.exports = mongoose;