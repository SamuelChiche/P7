const Comment = require('../models/comment.models')

exports.create = (req, res, next) => {
    let new_comment = {
        "post_id": req.body.post_id,
        "user_id": req.body.user_id,
        "text": req.body.text,
    }
    Comment.create(new_comment, (err, comment) => {
        if (err) {
            res.status(400).send({ err: 'Some error occured while creating comment' })
        } else {
            res.status(201).send({ message: 'Comment added succesfully !', data: comment })
        }
    })
}

exports.getOneComment = (req, res, next) => {
    let id = req.params.id;
    if (!id) {
        res.status(400).send({ error: "Id not provided" })
    }
    Comment.findById(id, (err, data) => {
        if (err) {
            if (err.kind == "not_found") {
                res.status(404).send({ err: 'Comment not found !' })
            } else {
                res.status(500).send({ err: "There was a problem retrieving this comment !" })
            }
        } else {
            res.status(200).send(data)
        }
    })
};

exports.getAllComments = (req, res, next) => {
    Comment.getAll((err, data) => {
        if (err) {
            res.status(500).send({ message: 'Some error occured while retrieving comments !' })
        } else {
            res.status(200).send(data)
        }
    })
};

exports.getCommentsFromPost = (req, res, next) => {
    let id = req.params.id
    if (!id) {
        res.status(400).send({ error: "Id not provided" })
    }
    Coment.getAllFromPost(id, (err, data) => {
        if (err) {
            if (err.kind == "not_found") {
                res.status(404).send({ err: 'Post not found !' })
            } else {
                res.status(500).send({ err: "There was a problem retrieving this post comments !" })
            }
        } else {
            res.status(200).send(data)
        }
    })
};

exports.deleteOne = (req, res, next) => {
    let id = req.params.id;
    if (!id) {
        res.status(400).send({ error: "Id not provided" })
    }
    Comment.findById(id, (err, comment, data) => {
        if (err) {
            if (err.kind == "not_found") {
                res.status(404).send({ err: 'Comment not found !' })
            } else {
                res.status(500).send({ err: "There was a problem retrieving this comment !" })
            }
        } else {
            Comment.deleteById(id, (err, data) => {
                if (err) {
                    if (err.kind === "not found") {
                        res.status(404).send({ message: 'Comment not found' })
                    } else {
                        res.status(500).send({ message: 'Error deleting comment' })
                    }
                } else {
                    res.status(200).json(data)
                }
            })

        }
    })
}