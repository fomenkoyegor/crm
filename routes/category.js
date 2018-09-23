const express = require('express');
const controller = require('../controllers/category');
const passport = require('passport');
const upload = require('../middleware/upload');
const router = express.Router();

router.get('/',passport.authenticate('jwt',{session:false}),controller.getAll);
router.get('/:id',passport.authenticate('jwt',{session:false}),controller.getById);
router.post('/',upload.single('image'),passport.authenticate('jwt',{session:false}),controller.create);
router.delete('/:id',passport.authenticate('jwt',{session:false}),controller.remove);
router.patch('/:id',passport.authenticate('jwt',{session:false}),upload.single('image'),controller.update);
router.put('/:id',passport.authenticate('jwt',{session:false}),controller.edit);



module.exports = router;