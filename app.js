async function main(){

// Import the 'express' library and assign it to the variable 'express'
// Set up express, HBS and wax-on
const express = require("express");
const hbs = require("hbs");
const wax = require("wax-on");
wax.on(hbs.handlebars);
wax.setLayoutPath("./views/layouts");

let app = express();

// Enable webforms
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "hbs"); // use handlebars for rendering pages
app.use(express.static("public")); // set route for static files
app.use(express.json()); // parse json objects

// Import the 'cors' library for handling Cross-Origin Resource Sharing
const cors = require("cors");

// Import and configure the 'dotenv' library for reading environment variables from a '.env' file
require("dotenv").config();

// Import the 'ObjectId' class from the 'mongodb' library
const ObjectId = require("mongodb").ObjectId;

// Import the 'MongoUtil' module from a local file ('./mongoUtil.js')
const mongoUtil = require("./mongoUtil.js");

// Retrieve the MongoDB connection URL from the environment variables using 'process.env'
const mongoUrl = process.env.MONGO_URL;




// Connect to Mongo
  let db = await mongoUtil.connect(process.env.MONGO_URL, 'playlog');

  let sessionList = await db.collection('session').find().toArray()

// Base Route
app.get("/", function(req,res){
    res.send(sessionList);
})


  app.listen(3000, () => console.log("Server started"));

}

main()
