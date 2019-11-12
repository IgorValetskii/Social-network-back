const Service = require('../services/stages');
const service = new Service();


class Controller {
    constructor() {
    }

    async getAllStages(req, res, next) {
        const result = await service.getAllStages();
        res.status(200).json(result);
    }

    async getStage(req, res, next) {
        const {stagesId} = req.params;
        const result = await service.getStage(stagesId);
        res.status(200).json(result);
    }

    async addStage(req, res, next) {
        const body = req.body;
        const result = await service.addStage(body);
        res.status(201).json(result);
    }

    async updateStage(req, res, next) {
        const {stagesId} = req.params;
        const newStage = req.body;
        const result = await service.updateStage(stagesId, newStage);
        res.status(200).json(result);
    }

    async deleteStage(req, res, next) {
        const {stagesId} = req.params;
        const result = await service.deleteStage(stagesId);
        if (result) res.status(200).send('User successfully deleted');
    }

}

module.exports = Controller;
