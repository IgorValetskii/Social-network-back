const jwt = require('jsonwebtoken');
const User = require('./models/user');
const mongoose = require('mongoose');

async function loginUser(req, res, next) {
    const nickname = req.body.userName;
    const password = req.body.password;
    const user = await User.find({userName: nickname, password : password});

    if (user[0]) {
        const userId = user[0]._id;
        jwt.sign({user}, 'secretkey', {expiresIn: '1d'}, (err, token) => {
            if (err) res.send(err.message);
            res.json({userId,token});
        });


    }else {
        res.status(403).send('Incorrect username or password')
    }
}

module.exports = loginUser;
