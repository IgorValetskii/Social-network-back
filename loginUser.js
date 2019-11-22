const jwt = require('jsonwebtoken');
const User = require('./models/user');
const mongoose = require('mongoose');

async function loginUser(req, res, next) {
    const nickname = req.body.userName;
    const password = req.body.password;
    const userArr = await User.find({userName: nickname, password : password});
    const user = userArr[0];

    if (user) {
        // console.log(user);
        const userId = user._id;
        jwt.sign({user}, 'secretkey', {expiresIn: '1d'}, (err, token) => {
            if (err) res.send(err.message);
            console.log(user);
            console.log(userId);
            console.log(token);
            res.json({user,userId,token});
        });


    }else {
        res.status(403).send('Incorrect username or password')
    }
}

module.exports = loginUser;
