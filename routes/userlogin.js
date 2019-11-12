const router = require('express-promise-router')();
const verifyLogin = require('../loginUser');

router.route('/')
    .post(verifyLogin);


module.exports = router;