const router = require('express').Router();
const passport = require('passport');
const postController = require('../controllers/post_controller');

// for Creating post
router.post('/create', passport.checkAuthentication, postController.create);

// For deleting the post
router.get('/destroy/:id', passport.checkAuthentication, postController.destroy);
module.exports = router;