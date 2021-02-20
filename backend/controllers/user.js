const sql = require('../models/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.models')

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = {
                "email": req.body.email,
                "name": req.body.name,
                "password": hash
            };
            sql.query('INSERT INTO users SET ?',
                user, function (error, results, fields) {
                    if (error) {
                        res.status(400).send({ error : "There was a problem registering the user" })
                    } else {
                        sql.query('SELECT * FROM users WHERE email = ?', [req.body.email], (err, user) =>{
                            if (err){
                                return res.status(500).send({ err : "There was a problem finding the user"})
                            }
                            else{
                                let token = jwt.sign({id: user.id}, "secret_key", {expiresIn : 86400});
                                res.status(200).send({ auth: true, token: token, user: user});
                            }
                        })
                    }
                });
        })
        .catch(error => res.status(400).json({ error }));
};

exports.login = (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;
    sql.query('SELECT * FROM users WHERE email = ?',
        [email], (error, results, fields) => {
            if (error) {
                res.status(400).send({ error })
            } else {
                if (results.length > 0) {
                    bcrypt.compare(password, results[0].password)
                        .then(valid => {
                            if (!valid) {
                                return res.status(401).send({auth : false, token : null})
                            } else {
                                sql.query('SELECT * FROM users WHERE email = ?', [req.body.email], (err, user) =>{
                                    if (err){
                                        return res.status(500).send({ err : "There was a problem finding the user"})
                                    }
                                    else{
                                        let token = jwt.sign({id: user.id}, "secret_key", {expiresIn : 86400});
                                        res.status(200).send({ auth: true, token: token, user: user[0]});
                                    }
                                })
                            }
                        })
                        .catch(error => {
                            console.log(error)
                            res.status(500).send( error )}
                        );
                } else {
                    return res.status(500).send("c'est pas ouf")
                }
            }
        }
    )
};

exports.getOneUser = (req, res, next) => {
    let id = req.params.id;
    User.findById(id, (err, data) => {
        if (err){
            if (err.kind == "not_found"){
                res.status(404).send({err : 'User not found !'})
            } else {
                res.status(500).send({err : "There was a problem retrieving this user !"})
            }
        } else {
            res.status(200).send(data)
        }
    })
};

exports.getAllUsers = (req, res, next) => {
    User.getAll((err, data) => {
        if (err) {
            res.status(500).send({message : 'Some error occured while retrieving users !'})
        } else {
            res.status(200).send(data)
        }
    })
};

exports.updateOneUser = (req, res, next) => {
    let id = req.params.id;
    let name = req.body.name;
    let email = req.body.email;

    if(!id || !name || !email) {
        res.status(400).json({ error : "error"})
    }
    User.findById(id, new User(req.body), (err, data) => {
        if (err) {
            if  (err.kind === "not found") {
                res.status(404).send({message : 'User not found'})
            } else {
                res.status(500).send({message : 'Error updating user'})
            }
        } else {
            res.status(201).send(data)
        }
    })
};

exports.deleteOneUser = (req, res, next) =>{
    let id = req.params.id;
    if(!id) {
        res.status(400).json({error : "Id not provided"})
    }
    User.deleteById(id, (err, data) => {
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
};
            