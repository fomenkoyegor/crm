var express = require('express');
const controller = require('../controllers/analitycs');
const passport = require('passport');
var router = express.Router();

router.get('/analitycs', passport.authenticate('jwt', { session: false }), controller.analytics);
router.get('/overview', passport.authenticate('jwt', { session: false }), controller.overview);


module.exports = router;


