const router = require('express-promise-router')();

const verifyToken = require('../verifyToken');
const verifyTokenAdmin = require('../verifyTokenAdmin');

const UsersController = require('../controllers/users');
const Controller = new UsersController();

/**
 * @swagger
 * tags:
 * - name: Users
 *   description: Requests connected with users data
 */

/**
 * @swagger
 * definitions:
 *   User:
 *     type: object
 *     properties:
 *       firstName:
 *         type: string
 *         example: Andrew
 *       lastName:
 *         type: string
 *         example: Fox
 *       userName:
 *         type: string
 *         example: Fox88
 */

router.route('/')

/**
 * @swagger
 * /users:
 *  get:
 *    tags: [Users]
 *    summary: Get all users
 *    description: Use to request all users
 *    responses:
 *      '200':
 *        description: All users object
 *        required: true
 *        schema:
 *          $ref: '#definitions/User'
 *      '404':
 *        description: Returns error message
 */

    .get(Controller.getAllUsers.bind(UsersController))

    /**
     * @swagger
     * /users:
     *   post:
     *     tags: [Users]
     *     summary: Add a new user
     *     parameters:
     *       - in: body
     *         name: body
     *         description: User object that needs to be added
     *         required: true
     *         schema:
     *           $ref: '#definitions/User'
     *     responses:
     *       '201':
     *         description: New user object
     *       '404':
     *         description: Returns error message
     */

    .post(Controller.addUser.bind(UsersController));

router.route('/:userId')

/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     tags: [Users]
 *     summary: Find user by ID
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: to find User
 *         type: string
 *         required: true
 *     responses:
 *       '200':
 *         description: Returns this user object
 *       '404':
 *         description: Returns error message
 */

    .get(Controller.getUser.bind(UsersController))

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
