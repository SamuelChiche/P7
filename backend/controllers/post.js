const Post = require("../models/post.models");

exports.create = (req, res, next) => {
    const new_post = {
        "user_id" : req.body.user_id,
        "text" : req.body.text
    }
    Post.create(new_post, (err, post) => {
        if (err) {
            throw err
        } else {
            res.status(201).send({message : 'Post added succesfully !', data: post})
        }
    })
};

exports.getAllPosts = (req, res, next) => {
    Post.getAll((err, data) => {
        if (err) {
            res.status(500).send({message : 'Some error occured while retrieving users !'})
        } else {
            res.status(200).send(data)
        }
    })
};
