const jwt = require('jsonwebtoken');

authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) {
        res.status(401).send({ error : 'Token is null'})
    } else {
        jwt.verify(token, 'secret_key', (err, user) => {
            if (err) {
                res.status(403).send({ error : 'Invalid token !'})
            } else {
                req.user = user
                next();
            }
        }) 
    }
};

module.exports = authenticateToken;