const router = require('express').Router();

const userController = require('../controllers/users_controllers');

// Routes for user profile, sign-up and sign-in
router.get('/profile', userController.profile);
router.get('/sign-up', userController.signUP);
router.get('/sign-in', userController.signIn);

module.exports = router;