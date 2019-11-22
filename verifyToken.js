const jwt = require('jsonwebtoken');
const User = require('./models/user');
const mongoose = require('mongoose');

async function verifyToken(req, res, next) {
      //Get auth header value
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;

    } else {
        res.sendStatus(403);
    }
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        console.log('123')
        if (err) {
            res.sendStatus(403);
        }
        next();
    });
}

module.exports = verifyToken;
