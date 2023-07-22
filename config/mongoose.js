const { log } = require("console");
const mongoose = require("mongoose");


// connecting with Database

const db  =  mongoose.connect("mongodb://localhost/codial",{useNewUrlParser: true,
useUnifiedTopology: true,})
.then(() => log("Connected to mongoDB"))
.catch((err) => log(`Error in connecting to mongoDb ${err}`));

module.exports = db;