const sql = require('../models/db');
const bcrypt = require('bcrypt');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = {
                "email": req.body.email,
                "name": req.body.name,
                "password": hash
            };
            sql.query('INSERT INTO user SET ?',
                user, function (error, results, fields) {
                    if (error) {
                        res.status(400).json({ error })
                    } else {
                        res.status(201).json({ message: 'User created !' })
                    }
                });
        })
        .catch(error => res.status(400).json({ error }));
};

exports.login = (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;
    sql.query('SELECT * FROM user WHERE email = ?',
        [email], (error, results, fields) => {
            if (error) {
                res.status(400).json({ error })
            } else {
                if (results.length > 0) {
                    bcrypt.compare(password, results[0].password)
                        .then(valid => {
                            if (!valid) {
                                return res.status(401).json({ error: 'Incorrect password !' })
                            }
                            res.status(200).json({ message: "User connected !" })
                        })
                        .catch(error => res.status(500).json({ error }));
                } else {
                    
                }
            }
        }
    )
};

exports.findById = (req, res, next ) => {
    let id = req.params.id;
    sql.query(`SELECT * FROM user WHERE id = ?`, id, (error, results, fields) => {
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
    sql.query('SELECT * FROM user', (error, results, fields) => {
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
    sql.query('UPDATE user SET name = ?, email = ? WHERE id = ?', [name, email, id], function (error, results, fields){
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


            