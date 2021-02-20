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

exports.getPostsFromUser = (req, res, next) => {
    let id = req.params.id
    Post.getAllFromUser(id, (err, data) => {
        if (err) {
            if (err.kind == "not_found"){
                res.status(404).send({err : 'User not found !'})
            } else {
                res.status(500).send({err : "There was a problem retrieving this user's post !"})
            }
        } else {
            res.status(200).send(data)
        }
    })
};

exports.deleteOne = (req, res, next) => {
    let id = req.params.id;
    if(!id) {
        res.status(400).json({error : "Id not provided"})
    }
    Post.deleteById(id, (err, data) => {
        if (err) {
            if  (err.kind === "not found") {
                res.status(404).send({message : 'User not found'})
            } else {
                res.status(500).send({message : 'Error deleting user'})
            }
        } else {
            res.status(200).json(data)
        }
    })
}
