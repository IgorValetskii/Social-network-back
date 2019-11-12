const jwt = require('jsonwebtoken');
const User = require('./models/user');
const mongoose = require('mongoose');

async function verifyTokenAdmin(req, res, next) {
    //Get auth header value
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
    } else {
        res.sendStatus(403);
    }

    jwt.verify(req.token, 'secretkey', (err) => {
        if (err) {
            res.sendStatus(403);
        }
    });

    const user = jwt.decode(req.token);
    const isAdmin = user.user[0].isAdmin;

    if (isAdmin){
        next();
    }else{
        res.status(403).send('You dont have authorization')
    }

}

module.exports = verifyTokenAdmin;
