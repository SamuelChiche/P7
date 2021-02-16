const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');

router.post('/', postCtrl.create);
router.get('/', postCtrl.getAllPosts);
router.get('/user/:id', postCtrl.getPostsFromUser);

module.exports = router;