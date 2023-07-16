const router = require('express').Router();

const userController = require('../controllers/users_controllers');

router.get('/profile', userController.profile);

module.exports = router;