const express = require('express');
const router = express.Router();
const authToken = require('../middleware/auth')
const commentCtrl = require('../controllers/comment')

router.post('/', authToken, commentCtrl.create);
router.get('/', authToken, commentCtrl.getAllComments);
router.get('/:id', authToken, commentCtrl.getOneComment);
router.get('/post/:id', authToken , commentCtrl.getCommentsFromPost);
router.delete('/:id', authToken , commentCtrl.deleteOne);

module.exports = router;