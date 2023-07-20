const { log } = require('console');
const express = require('express');
const cookieParser = require('cookie-parser');
const port = 8000;
const db = require('./config/mongoose');

const expressLayouts = require('express-ejs-layouts');
// express app
const app = express();
app.use(express.urlencoded({extended:true}));

app.use(cookieParser());
// use static files
app.use(express.static('./assets'));

// set the express Layouts
app.use(expressLayouts);
// extract style and scripts form sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// let's set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');


// use express router 
app.use('/', require('./routes'));

// setting up server
app.listen(port, (err) =>{
    if(err){
        log(`Error in running server ${err}`);
    }
    log(`Server is runninng on port ${port}`);
})