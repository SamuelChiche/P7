const express = require('express');
const router = express.Router();
const authToken = require('../middleware/auth')

const postCtrl = require('../controllers/post');

router.post('/', authToken, postCtrl.create);
router.get('/', authToken, postCtrl.getAllPosts);
router.get('/user/:id', authToken , postCtrl.getPostsFromUser);
router.delete('/:id', authToken , postCtrl.deleteOne);

module.exports = router;