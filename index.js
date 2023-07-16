const { log } = require("console");
const express = require("express");
const port = 8000;
const db = require("./config/mongoose");

const app = express();


// setting up server
app.listen(port, (err) =>{
    if(err){
        log(`Error in running server ${err}`);
    }
    log(`Server is runninng on port ${port}`);
})