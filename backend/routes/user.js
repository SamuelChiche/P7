const express = require('express');
const router = express.Router();
     
const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/:id', userCtrl.findById);
router.get('/', userCtrl.findAll);
router.put('/:id',userCtrl.updateOne);
router.delete('/', userCtrl.deleteOne);

module.exports = router;