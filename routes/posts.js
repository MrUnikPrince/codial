const router = require('express').Router();
const postController = require('../controllers/post_controller');
router.post('/create', postController.create);
module.exports = router;