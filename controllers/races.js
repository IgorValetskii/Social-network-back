const Service = require('../services/races');
const service = new Service();


class Controller {
    constructor() {

    }

    async getAllRaces(req, res, next) {
        const result = await service.getAllRaces();
        res.status(200).json(result);
    }

    async getRace(req, res, next) {
        const {racesId} = req.params;
        const result = await service.getRace(racesId);
        res.status(201).json(result);
    }

    async addRace(req, res, next) {
        const body = req.body;
        const result = await service.addRace(body);
        res.status(201).json(result);

    }


    async updateRace(req, res, next) {
        const {racesId} = req.params;
        const newRace = req.body;
        const result = await service.updateRace(racesId, newRace);
        res.status(200).json(result);
    }

    async deleteRace(req, res, next) {
        const {racesId} = req.params;
        const result = await service.deleteRace(racesId);
        if (result) res.status(200).send('User successfully deleted');
    }

    async getRaceStages(req, res) {
        const {season} = req.params;
        const result = await service.getRaceStages(season);
        res.status(201).json(result);
    }

}

module.exports = Controller;
