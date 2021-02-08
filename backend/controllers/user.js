const sql = require('../models/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
                        res.status(400).json({ error : "There was a problem registering the user" })
                    } else {
                        sql.query('SELECT * FROM users WHERE email = ?', [req.body.email], (err, user) =>{
                            if (err){
                                return res.status(500).json({ err : "There was a problem finding the user"})
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
                res.status(400).json({ error })
            } else {
                if (results.length > 0) {
                    bcrypt.compare(password, results[0].password)
                        .then(valid => {
                            if (!valid) {
                                return res.status(401).send({auth : false, token : null})
                            } else {
                                sql.query('SELECT * FROM users WHERE email = ?', [req.body.email], (err, user) =>{
                                    if (err){
                                        return res.status(500).json({ err : "There was a problem finding the user"})
                                    }
                                    else{
                                        let token = jwt.sign({id: user.id}, "secret_key", {expiresIn : 86400});
                                        res.status(200).send({ auth: true, token: token, user: user});
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

exports.findById = (req, res, next ) => {
    let id = req.params.id;
    sql.query(`SELECT * FROM users WHERE id = ?`, id, (error, results, fields) => {
        if (error) {
          res.status(400).json({ error })
        } else {
            if (results === undefined || results.length == 0){
                res.status(400).json({ error : "User not found"})
            } else {
                res.status(200).json({data : results[0]});
            }
        }
    })
};

exports.findAll = (req, res, next) => {
    sql.query('SELECT * FROM users', (error, results, fields) => {
        if (error){
            res.status(400).json({ error })
        } else {
            if (results === undefined || results.length == 0){
                res.status(400).json({ error : "User table is empty" })
            } else {
                res.status(200).json({data : results})
            }
        }
    })
};

exports.updateOne = (req, res, next) => {
    let id = req.body.id;
    let name = req.body.name;
    let email = req.body.email;

    if(!id || !name || !email) {
        res.status(400).json({ error : "error"})
    }
    sql.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id], function (error, results, fields){
        if (error){
            res.status(400).json({ error })
        } else {
            if (results.changedRows === 0){
                res.status(400).json({ error : "User not found or data are same" })
            } else {
                res.status(201).json({data : results})
            }
        }
    })
};

exports.deleteOne = (req, res, next) =>{
    let id = req.body.id;
    if(!id) {
        res.status(400).json({error : "Id not provided"})
    }
    sql.query('DELETE FROM users WHERE id = ?', [id], (error, results, fields)=> {
        if (error){
            res.status(400).json({error});
        } else {
            if (results.affectedRows === 0){
                res.status(400).json({ error : "User not found" })
            } else {
                res.status(200).json({ message : "User successfully deleted" })
            } 
        }
    })
};
            