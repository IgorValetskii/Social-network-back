const router = require('express-promise-router')();

const verifyToken = require('../verifyToken');
const verifyTokenAdmin = require('../verifyTokenAdmin');

const UsersController = require('../controllers/users');
const Controller = new UsersController();


router.route('/')

    .post(Controller.addUser.bind(UsersController))

    .get(verifyToken,Controller.getUser.bind(UsersController));


router.route('/all')
    // .get(verifyToken,Controller.getAllUsers.bind(UsersController));
    .get(Controller.getAllUsers.bind(UsersController));
router.route('/all/:id')

    .put(Controller.updateUser.bind(UsersController))

    // запрос на получение готового объекта для отрисовки страницы ДРУЗЬЯ
    // .post(Controller.createObjFriend.bind(UsersController))


    .delete(Controller.deleteUser.bind(UsersController));

router.route('/friendschange/:id')

    .put(Controller.friendChange.bind(UsersController));

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
