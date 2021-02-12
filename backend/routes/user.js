const express = require('express');
const router = express.Router();
const authToken = require('../middleware/auth')
     
const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/:id', authToken, userCtrl.getOneUser);
router.get('/', authToken, userCtrl.getAllUsers);
router.put('/:id', authToken, userCtrl.updateOneUser);
router.delete('/:id', authToken, userCtrl.deleteOneUser);

module.exports = router;