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
/**
 * @swagger
 * /users/{userId}:
 *   put:
 *     tags: [Users]
 *     summary: Edit user by id
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: to find User
 *         type: string
 *         required: true
 *       - in: body
 *         name: body
 *         description: New user parameters
 *         required: true
 *         schema:
 *           $ref: '#definitions/User'
 *     responses:
 *       '200':
 *         description: New user object
 *       '404':
 *         description: Returns error message
 */

    .put(Controller.updateUser.bind(UsersController))

/**
 * @swagger
 * /users/{userId}:
 *   delete:
 *     tags: [Users]
 *     summary: Delete user by id
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: to delete User
 *         type: string
 *         required: true
 *     responses:
 *       '200':
 *         description: Message with deleting confirmation
 *       '404':
 *         description: Returns error message
 */

    .delete(Controller.deleteUser.bind(UsersController));

router.route('/:userId/races')

/**
 * @swagger
 * /users/{userId}/races:
 *   get:
 *     tags: [Users]
 *     summary: Get user by Id with races
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: to get User with races
 *         type: string
 *         required: true
 *     responses:
 *       '200':
 *         description: User object with races
 *       '404':
 *         description: Returns error message
 */

    .get(verifyToken,Controller.getUserRaces.bind(UsersController));

router.route('/:userId/leagues')

/**
 * @swagger
 * /users/{userId}/leagues:
 *   get:
 *     tags: [Users]
 *     summary: Get user by Id with leagues
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: to get User with leagues
 *         type: string
 *         required: true
 *     responses:
 *       '200':
 *         description: User object with races
 *       '404':
 *         description: Returns error message
 */

    .get(verifyToken,Controller.getUserLeagues.bind(UsersController));

module.exports = router;
