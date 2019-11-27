const router = require('express-promise-router')();

const verifyToken = require('../verifyToken');
const verifyTokenAdmin = require('../verifyTokenAdmin');

const UsersController = require('../controllers/users');
const Controller = new UsersController();


router.route('/')

    // .get(verifyToken,Controller.getUserLogIn.bind(UsersController))
    .post(Controller.addUser.bind(UsersController));

router.route('/all')
    .get(Controller.getAllUsers.bind(UsersController));
//     .get(Controller.getAllUsers.bind(UsersController));
//
router.route('/addfriend')
    .put(verifyToken,Controller.addFriend.bind(UsersController));

router.route('/friendreq')
    .put(verifyToken,Controller.friendReq.bind(UsersController));

router.route('/:id')
    .get(Controller.getUser.bind(UsersController));

// router.route('/all/:id')
//     .put(Controller.updateUser.bind(UsersController))
//     .delete(Controller.deleteUser.bind(UsersController));
//
// router.route('/incomingfriendschange/:id')
//
//     .put(Controller.incomingFriendChange.bind(UsersController));
//
// router.route('/outgoingfriendschange/:id')
//
//     .put(Controller.outgoingFriendsChange.bind(UsersController));

// router.route('/:userId/leagues')
//
// /**
//  * @swagger
//  * /users/{userId}/leagues:
//  *   get:
//  *     tags: [Users]
//  *     summary: Get user by Id with leagues
//  *     parameters:
//  *       - name: userId
//  *         in: path
//  *         description: to get User with leagues
//  *         type: string
//  *         required: true
//  *     responses:
//  *       '200':
//  *         description: User object with races
//  *       '404':
//  *         description: Returns error message
//  */
//
//     .get(verifyToken,Controller.getUserLeagues.bind(UsersController));

module.exports = router;
