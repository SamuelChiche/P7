const Post = require("../models/post.models");
const fs = require('fs');

exports.create = (req, res, next) => {
    if (!req.file) {
        let new_post = {
            "user_id": req.body.user_id,
            "text": req.body.text,
            "title": req.body.title,
            "user_name": req.body.user_name,
        }
        Post.create(new_post, (err, post) => {
            if (err) {
                res.status(400).send({ err: 'Some error occured while creating post' })
            } else {
                res.status(201).send({ message: 'Post added succesfully !', data: post })
            }
        })
    } else {
        let new_post = {
            "user_id": req.body.user_id,
            "text": req.body.text,
            "title": req.body.title,
            "user_name": req.body.user_name,
            "image": `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        }
        Post.create(new_post, (err, post) => {
            if (err) {
                res.status(400).send({ err: 'Some error occured while creating post' })
            } else {
                res.status(201).send({ message: 'Post added succesfully !', data: post })
            }
        })
    }
};

exports.getOnePost = (req, res, next) => {
    let id = req.params.id;
    if (!id) {
        res.status(400).json({ error: "Id not provided" })
    }
    Post.findById(id, (err, data) => {
        if (err) {
            if (err.kind == "not_found") {
                res.status(404).send({ err: 'Post not found !' })
            } else {
                res.status(500).send({ err: "There was a problem retrieving this post !" })
            }
        } else {
            res.status(200).send(data)
        }
    })
};

exports.getAllPosts = (req, res, next) => {
    Post.getAll((err, data) => {
        if (err) {
            res.status(500).send({ message: 'Some error occured while retrieving users !' })
        } else {
            res.status(200).send(data)
        }
    })
};

exports.getPostsFromUser = (req, res, next) => {
    let id = req.params.id
    if (!id) {
        res.status(400).json({ error: "Id not provided" })
    }
    Post.getAllFromUser(id, (err, data) => {
        if (err) {
            if (err.kind == "not_found") {
                res.status(404).send({ err: 'User not found !' })
            } else {
                res.status(500).send({ err: "There was a problem retrieving this user's post !" })
            }
        } else {
            res.status(200).send(data)
        }
    })
};

exports.deleteOne = (req, res, next) => {
    let id = req.params.id;
    if (!id) {
        res.status(400).json({ error: "Id not provided" })
    }
    Post.findById(id, (err, data) => {
        if (err) {
            if (err.kind == "not_found") {
                res.status(404).send({ err: 'Post not found !' })
            } else {
                res.status(500).send({ err: "There was a problem retrieving this post !" })
            }
        } else {
            let filename = JSON.stringify(data[0].image).split('/images/')[1].slice(0, -1)
            console.log(filename)
            fs.unlink(`images/${filename}`, () => {
                Post.deleteById(id, (err, data) => {
                    if (err) {
                        if (err.kind === "not found") {
                            res.status(404).send({ message: 'User not found' })
                        } else {
                            res.status(500).send({ message: 'Error deleting post' })
                        }
                    } else {
                        res.status(200).json(data)
                    }
                })
            })
        }
    })
}

