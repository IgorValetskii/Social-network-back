const router = require('express-promise-router')();

const verifyToken = require('../verifyToken');
const verifyTokenAdmin = require('../verifyTokenAdmin');

const LeaguesController = require('../controllers/leagues');
const controller = new LeaguesController();
/**
 * @swagger
 * tags:
 * - name: Leagues
 *   description: Requests connected with leagues data
 */

/**
 * @swagger
 * definitions:
 *   League:
 *     type: object
 *     properties:
 *       title:
 *         type: string
 *         example: League1
 *       description:
 *         type: string
 *         example: League in England
 *       season:
 *         type: string
 *         example: Winter
 *       users:
 *         type: array
 *         items:
 *           type: object
 *           properties:
 *             userId:
 *               type: string
 *               example: 5d9dab1ced1b960f48fd8a89
*/

router.route('/')

/**
 * @swagger
 * /leagues:
 *  get:
 *    tags: [Leagues]
 *    summary: Get all leagues
 *    description: Use to request all leagues
 *    responses:
 *      '200':
 *        description: All leagues object
 *      '404':
 *        description: Returns error message
 */

    .get(verifyToken,controller.getAllLeagues.bind(LeaguesController))

/**
 * @swagger
 * /leagues:
 *   post:
 *     tags: [Leagues]
 *     summary: Add a new league
 *     parameters:
 *       - in: body
 *         newLeague: body
 *         description: League object that needs to be added
 *         required: true
 *         schema:
 *           $ref: '#definitions/League'
 *     responses:
 *       '200':
 *         description: New league object
 *       '404':
 *         description: Returns error message
 */

    .post(verifyTokenAdmin,controller.addLeague.bind(LeaguesController));

router.route('/:leaguesId')

/**
 * @swagger
 * /leagues/{leagueId}:
 *   get:
 *     tags: [Leagues]
 *     summary: Find league by ID
 *     parameters:
 *       - name: leagueId
 *         in: path
 *         description: to find League
 *         type: string
 *         required: true
 *     responses:
 *       '200':
 *         description: Returns league object
 *       '404':
 *         description: Returns error message
 */

    .get(verifyToken,controller.getLeague.bind(LeaguesController))

/**
 * @swagger
 * /leagues/{leagueId}:
 *   put:
 *     tags: [Leagues]
 *     summary: Edit league by id
 *     parameters:
 *       - name: leagueId
 *         in: path
 *         description: to update League
 *         type: string
 *         required: true
 *       - in: body
 *         name: body
 *         description: New league parameters
 *         required: true
 *         schema:
 *           $ref: '#definitions/League'
 *     responses:
 *       '200':
 *         description: Updated league object
 *       '404':
 *         description: Returns error message
 */

    .put(verifyTokenAdmin,controller.updateLeague.bind(LeaguesController))

/**
* @swagger
* /leagues/{leagueId}:
*   delete:
*     tags: [Leagues]
*     summary: delete league by id
*     parameters:
*       - name: leagueId
*         in: path
*         description:  to delete League
*         type: string
*         required: true
*     responses:
*       '200':
*         description: Message with deleting confirmation
*       '404':
*         description: Returns error message
*/

    .delete(verifyTokenAdmin,controller.deleteLeague.bind(LeaguesController));

router.route('/:leaguesId/users')

/**
 * @swagger
 * /leagues/{leagueId}/users:
 *   post:
 *     tags: [Leagues]
 *     summary: Add user to league
 *     parameters:
 *       - name: leagueId
 *         in: path
 *         description: to add user
 *         type: string
 *         required: true
 *       - in: body
 *         userId: string
 *         required: true
 *         schema:
 *           $ref: '#definitions/UserId'
 *     responses:
 *       '200':
 *         description: League object with users
 *       '404':
 *         description: Returns error message
 */

    .post(verifyTokenAdmin,controller.addLeagueUser.bind(LeaguesController));

module.exports = router;
