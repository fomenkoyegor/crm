var express = require('express');
const controller = require('../controllers/position');
const passport = require('passport');
var router = express.Router();

router.get('/:id', passport.authenticate('jwt', { session: false }), controller.getByCategoryId);
router.post('/', passport.authenticate('jwt', { session: false }), controller.create);
router.patch('/:id', passport.authenticate('jwt', { session: false }), controller.update);
router.put('/:id', passport.authenticate('jwt', { session: false }), controller.edit);
router.delete('/:id', passport.authenticate('jwt', { session: false }), controller.remove);


module.exports = router;