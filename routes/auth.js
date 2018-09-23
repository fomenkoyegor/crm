var express = require('express');
const controller = require('../controllers/auth');
var router = express.Router();

router.post('/login',controller.login);
router.post('/register',controller.register);
router.get('/users',controller.users);

module.exports = router;