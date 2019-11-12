const router = require('express-promise-router')();

const verifyToken = require('../verifyToken');
const verifyTokenAdmin = require('../verifyTokenAdmin');

const RacesController = require('../controllers/races');
const controller = new RacesController();

/**
 * @swagger
 * tags:
 * - name: Races
 *   description: Requests connected with races data
 */

/**
 * @swagger
 * definitions:
 *   Race:
 *     type: object
 *     properties:
 *       title:
 *         type: string
 *         example: race 1
 *       description:
 *         type: string
 *         example: race 1
 *       time:
 *         type: string
 *         example: 16 p.m.
 *       stage:
 *         type: object
 *         properties:
 *           stageId:
 *             type: string
 *             example: 5d9ef66070ba30080484f874
 *       user:
 *         type: object
 *         properties:
 *           userId:
 *             type: string
 *             example: 5d9daa60ed1b960f48fd8a87
 *
 */

router.route('/')

/**
 * @swagger
 * /races:
 *  get:
 *    tags: [Races]
 *    summary: Get all races
 *    description: Use to request all races
 *    responses:
 *      '200':
 *        description: All races objects
 *      '404':
 *        description: Returns error message
 */

    .get(verifyToken,controller.getAllRaces.bind(RacesController))

/**
 * @swagger
 * /races:
 *   post:
 *     tags: [Races]
 *     summary: Add a new race
 *     parameters:
 *       - in: body
 *         newRace: body
 *         description: Race object that needs to be added
 *         required: true
 *         schema:
 *           $ref: '#definitions/Race'
 *     responses:
 *       '200':
 *         description: New race object
 *       '404':
 *         description: Returns error message
 */

    .post(verifyTokenAdmin,controller.addRace.bind(RacesController));

router.route('/:racesId')

/**
 * @swagger
 * /races/{racesId}:
 *   get:
 *     tags: [Races]
 *     summary: Find race by Id
 *     parameters:
 *       - name: RaceId
 *         in: path
 *         description: to find Race
 *         type: string
 *         required: true
 *     responses:
 *       '200':
 *         description: Returns race object
 *       '404':
 *         description: Returns error message
 */
    .get(verifyToken,controller.getRace.bind(RacesController))

/**
 * @swagger
 * /races/{raceId}:
 *   put:
 *     tags: [Races]
 *     summary: Edit race by Id
 *     parameters:
 *       - name: RaceId
 *         in: path
 *         description: to update Race
 *         type: string
 *         required: true
 *       - in: body
 *         name: body
 *         description: New race parameters
 *         required: true
 *         schema:
 *           $ref: '#definitions/Race'
 *     responses:
 *       '200':
 *         description: Updated race object
 *       '404':
 *         description: Returns error message
 */

    .put(verifyTokenAdmin,controller.updateRace.bind(RacesController))

/**
 * @swagger
 * /races/{raceId}:
 *   delete:
 *     tags: [Races]
 *     summary: delete race by Id
 *     parameters:
 *       - name: raceId
 *         in: path
 *         description:  to delete Race
 *         type: string
 *         required: true
 *     responses:
 *       '200':
 *         description: Message with deleting confirmation
 *       '404':
 *         description: Returns error message
 */


    .delete(verifyTokenAdmin,controller.deleteRace.bind(RacesController));

router.route('/:season/stages')

/**
 * @swagger
 * /races/{season}/stages:
 *   get:
 *     tags: [Races]
 *     summary: get all races with stages by season
 *     parameters:
 *       - name: season
 *         in: path
 *         description: to find races with stages by season
 *         type: string
 *         required: true
 *     responses:
 *       '200':
 *         description: Returns race objects
 *       '404':
 *         description: Returns error message
 */

    .get(verifyToken,controller.getRaceStages.bind(RacesController));

module.exports = router;
