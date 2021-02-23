const Post = require("../models/post.models");
const sql = require('../models/db');

exports.create = (req, res, next) => {
    const new_post = {
        "user_id" : req.body.user_id,
        "text" : req.body.text,
        "title" : req.body.title,
        "user_name" : req.body.user_name,
    }
    Post.create(new_post, (err, post) => {
        if (err) {
            throw err
        } else {
            res.status(201).send({message : 'Post added succesfully !', data: post})
        }
    })
};

exports.getOnePost = (req, res, next) => {
    let id = req.params.id;
    Post.findById(id, (err, data) => {
        if (err){
            if (err.kind == "not_found"){
                res.status(404).send({err : 'Post not found !'})
            } else {
                res.status(500).send({err : "There was a problem retrieving this post !"})
            }
        } else {
            res.status(200).send(data)
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

exports.vote =  (req, res, next) => {
    let id = req.params.id;
    Post.findById(id, (err , data) =>{
        if (err){
            res.status(404).send({err : 'Post not found !'}) 
        } else {
            let like = req.body.like;
            switch (like) {
                case 1 :
                    const upvotes = {
                        "fk_user_id" : req.body.user_id,
                        "fk_post_id" : req.params.id,
                        "pvote_score" : +1,
                    }
                    sql.query('INSERT INTO pvotes SET ?', upvotes, (error, results, fields) => {
                        if (error) {
                            res.status(400).send(error)
                        } else {
                            res.status(200).send({message : "Success"})
                        }
                    })
                break ;
                case 0 : 
                    sql.query('DELETE FROM pvotes WHERE fk_user_id = ? and fk_post_id = ?', [req.body.user_id, req.params.id], ( error, results, fields) => {
                        if (error) {
                            res.status(400).send(error)
                        } else {
                            res.status(200).send({ message : "Success"})
                            
                        }
                    })
                break ;

                case  -1 :
                    const downvotes = {
                        "fk_user_id" : req.body.user_id,
                        "fk_post_id" : req.params.id,
                        "pvote_score" : -1,
                    }
                    sql.query('INSERT INTO pvotes SET ?', downvotes, (error, results, fields) => {
                        if (error) {
                            res.status(400).send(error)
                        } else {
                            res.status(200).send({message : "Success"})
                        }
                    })
                break;
            }
        }
    } )
}
exports.userDownote = (req, res, next ) => {
    user_id = req.body.user_id
    sql.query('SELECT * FROM pvotes WHERE fk_user_id = ? and fk_post_id = ? and pvote_score = -1', [user_id, req.params.id], (error, results, fields) => {
        if (error) {
            res.status(400).send(error) 
        } else {
            if (JSON.stringify(results[0]) === undefined) {
                res.status(200).send({'result': false})
            }
             else {
                res.status(200).send({'result': true})
            }
        }
    })
};

exports.userUpvote = (req, res, next) => {
    user_id = req.body.user_id
    sql.query('SELECT * FROM pvotes WHERE fk_user_id = ? and fk_post_id = ? and pvote_score = 1', [user_id, req.params.id], (error, results, fields) => {
        if (error) {
            res.status(400).send(error) 
        } else {
            if (JSON.stringify(results[0]) === undefined) {
                res.status(200).send({'result': false})
            }
             else {
                res.status(200).send({'result': true})
            }
        }
    })
}