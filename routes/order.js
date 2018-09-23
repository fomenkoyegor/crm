var express = require('express');
const controller = require('../controllers/order');
const passport = require('passport');
const upload = require('../middleware/upload');
var router = express.Router();

router.get('/',passport.authenticate('jwt',{session:false}),controller.getAll);
router.post('/',passport.authenticate('jwt',{session:false}),controller.create);

module.exports = router;