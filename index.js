const { log } = require('console');
const express = require('express');
const port = 8000;
const db = require('./config/mongoose');

// express app
const app = express();

// use static files
app.use(express.static('./assets'));

// set the express Layouts
// extract style and scripts form sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// let's set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');


// setting up server
app.listen(port, (err) =>{
    if(err){
        log(`Error in running server ${err}`);
    }
    log(`Server is runninng on port ${port}`);
})