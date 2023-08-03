const { log } = require('console');

const router = require('express').Router();

log("router loaded");
const homeController = require('../controllers/home_controller');

router.get('/', homeController.home);
router.use('/users', require('./users')); // if Request for Users
router.use('/posts', require('./posts')); // if request for Posts
router.use('/comments', require('./comments'));
// for any further routes, access from here 
// router.use('/routerName', require('./routerfile));

module.exports = router;