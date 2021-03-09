const express = require('express');
const router = express.Router();
const authToken = require('../middleware/auth')
const multer = require('../middleware/multer-config')

const postCtrl = require('../controllers/post');

router.post('/', authToken, multer, postCtrl.create);
router.get('/', authToken, postCtrl.getAllPosts);
router.get('/:id', authToken, postCtrl.getOnePost);
router.get('/user/:id', authToken , postCtrl.getPostsFromUser);
router.delete('/:id', authToken , postCtrl.deleteOne);
router.put('/:id', authToken, postCtrl.updateOne)

module.exports = router;