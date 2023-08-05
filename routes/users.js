const router = require('express').Router();
const passport = require('passport');
const userController = require('../controllers/users_controllers');

// Routes for user profile, sign-up and sign-in
router.get('/profile/:id', passport.checkAuthentication,userController.profile);
router.post('/update/:id', passport.checkAuthentication,userController.update);


router.get('/sign-up', userController.signUP);
router.get('/sign-in', userController.signIn);


router.post('/create', userController.create);

// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local', {failureRedirect: '/users/sign-in'},
),userController.createSession);

router.get('/sign-out', userController.destroySession);
module.exports = router;