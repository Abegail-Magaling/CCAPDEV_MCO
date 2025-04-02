Karfind Web Application

Features:
User Authentication
Restaurant Listings
User Profile
Admin Roles
Password Hashing
Session Management

Packages:
{
  "dependencies": {
    "bcrypt": "^5.1.1",
    "dotenv": "^16.4.7",
    "ejs": "^3.1.10",
    "express": "^4.21.2",
    "express-handlebars": "^8.0.1",
    "express-session": "^1.18.1",
    "hbs": "^4.2.0",
    "mongoose": "^8.12.1",
    "multer": "^1.4.5-lts.2"
  }
}

Pre-Requisites:
Before running the project locally, ensure that you have the following installed on your machine:
    1. Node.js: Download Node.js
    2. MongoDB: Download MongoDB (for local setup) or use MongoDB Atlas (cloud database)


Installation Steps:
1. https://github.com/Abegail-Magaling/CCAPDEV_MCO.git - clone the repository 
2. type 'npm install' on your vscode terminal to install the following Packages
    - express
    - mongoose
    - bcrypt
    - ejs
    - dotenv
    - express-session
    - multer
3. Set up mongoDB compass / atlas
    - locally, install mongoDB compass and your default database will set up at mongodb://localhost:27017
4. use command node index.js to run
    optionally, you can use nodemon for automatic updates every change (cmd: "npm install -g nodemon")

