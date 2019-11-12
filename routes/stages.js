const router = require('express-promise-router')();

const verifyToken = require('../verifyToken');
const verifyTokenAdmin = require('../verifyTokenAdmin');

const StagesController = require('../controllers/stages');
const controller = new StagesController();

/**
 * @swagger
 * tags:
 * - name: Stages
 *   description: Requests connected with stages data
 */

/**
 * @swagger
 * definitions:
 *   Stage:
 *     type: object
 *     properties:
 *       title:
 *         type: string
 *         example: stage1
 *       description:
 *         type: string
 *         example: description
 *       location:
 *         type: string
 *         example: liverpool
 *       league:
 *         type: object
 *         properties:
 *           leagueId:
 *             type: string
 *             example: 5d9dacd0ed1b960f48fd8a8c
 */


router.route('/')

/**
 * @swagger
 * /stages:
 *  get:
 *    tags: [Stages]
 *    summary: Get all stages
 *    description: Use to request all stages
 *    responses:
 *      '200':
 *        description: All stages object
 *      '404':
 *        description: Returns error message
 */

    .get(verifyToken,controller.getAllStages.bind(StagesController))

/**
 * @swagger
 * /stages:
 *   post:
 *     tags: [Stages]
 *     summary: Add a new stage
 *     parameters:
 *       - in: body
 *         newStage: body
 *         description: Stage object that needs to be added
 *         required: true
 *         schema:
 *           $ref: '#definitions/Stage'
 *     responses:
 *       '200':
 *         description: New stage object
 *       '404':
 *         description: Returns error message
 */

    .post(verifyTokenAdmin,controller.addStage.bind(StagesController));

router.route('/:stagesId')

/**
 * @swagger
 * /stages/{stagesId}:
 *   get:
 *     tags: [Stages]
 *     summary: Find stage by Id
 *     parameters:
 *       - name: StageId
 *         in: path
 *         description: to find Stage
 *         type: string
 *         required: true
 *     responses:
 *       '200':
 *         description: Returns stage object
 *       '404':
 *         description: Returns error message
 */

    .get(verifyToken,controller.getStage.bind(StagesController))

/**
 * @swagger
 * /stages/{stageId}:
 *   put:
 *     tags: [Stages]
 *     summary: Edit stage by Id
 *     parameters:
 *       - name: stageId
 *         in: path
 *         description: to update Stage
 *         type: string
 *         required: true
 *       - in: body
 *         name: body
 *         description: New stage parameters
 *         required: true
 *         schema:
 *           $ref: '#definitions/Stage'
 *     responses:
 *       '200':
 *         description: Updated stage object
 *       '404':
 *         description: Returns error message
 */

    .put(verifyTokenAdmin,controller.updateStage.bind(StagesController))

/**
 * @swagger
 * /stages/{stageId}:
 *   delete:
 *     tags: [Stages]
 *     summary: delete stage by Id
 *     parameters:
 *       - name: stageId
 *         in: path
 *         description:  to delete Stage
 *         type: string
 *         required: true
 *     responses:
 *       '200':
 *         description: Message with deleting confirmation
 *       '404':
 *         description: Returns error message
 */

    .delete(verifyTokenAdmin,controller.deleteStage.bind(StagesController));

module.exports = router;
