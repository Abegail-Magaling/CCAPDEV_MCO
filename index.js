const express = require('express');
const path = require("path");
// const bcrypt = require("bcrypt");
const authRoutes = require("./routes/authRoutes")
const apiRoutes = require("./routes/apiRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const restoRoutes = require("./routes/restoRoutes");
const session  = require("express-session");

const app = express();

app.use(session({
    secret: "mcokarfindapdev",
    resave: false,
    saveUninitialized: false,
    cookie: {secure : false, maxAge: 7 * 24 * 60 * 60 * 1000}
}))

//convert data to json
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//use EJS as the viw engine
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));
 
app.use("/api", apiRoutes);
app.use("/api", reviewRoutes);
app.use("/", restoRoutes);
app.use("/", authRoutes);
app.use(express.static(path.join(__dirname, "public")));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on Port : ${port}`);
})