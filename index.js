const { log } = require('console');
const express = require('express');
const cookieParser = require('cookie-parser');
const port = 9000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
// express app
const app = express();

// Used for session cookie 
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');

app.use(sassMiddleware({
    src : './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: './css'
}));

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// use static files
app.use(express.static('./assets'));

app.use(expressLayouts);
// extract style and scripts form sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// let's set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// mongo storeis used to save the session cookiein the db 
app.use(session({
    name: 'codial',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (100 * 60 * 100)
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost/codial',
        autoRemove: 'disabled'
    })
    }, (err) => {
    console.log(err || 'connect - mongodb setup ok');
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
// use express router 
app.use('/', require('./routes'));

// setting up server
app.listen(port, (err) => {
    if (err) {
        log(`Error in running server ${err}`);
    }
    log(`Server is runninng on port ${port}`);
})