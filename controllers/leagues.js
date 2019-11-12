const Service = require('../services/leagues');
const service = new Service();


class Controller {
    constructor() {

    }

    async getAllLeagues(req, res, next) {
        const result = await service.getAllLeagues();
        res.status(200).json(result);
    }

    async getLeague(req, res, next) {
        const {leagueId} = req.params;
        const result = await service.getLeague(leagueId);
        res.status(201).json(result);
    }

    async addLeague(req, res, next) {
        const body = req.body;
        const result = await service.addLeague(body);
        res.status(201).json(result);

    }


    async updateLeague(req, res, next) {
        const {leaguesId} = req.params;
        const newLeague = req.body;
        const result = await service.updateLeague(leaguesId, newLeague);
        res.status(200).json(result);
    }

    async deleteLeague(req, res, next) {
        const {leaguesId} = req.params;
        const result = await service.deleteLeague(leaguesId);
        if (result) res.status(200).send('User successfully deleted');
    }

    async addLeagueUser(req, res) {
        const {leaguesId} = req.params;
        const body = req.body;
        const result = await service.addLeagueUser(body, leaguesId);
        res.status(201).json(result);

    }

}

module.exports = Controller;
