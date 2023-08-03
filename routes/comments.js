const router = require('express').Router();
const passport = require('passport');
const commentController = require('../controllers/comments_controller');

// for Creating post

router.post('/create', passport.checkAuthentication, commentController.create);

module.exports = router;