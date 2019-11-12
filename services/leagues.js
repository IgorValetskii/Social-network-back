const League = require('../models/leagues');

class Service {
    constructor() {

    }

    async getAllLeagues() {
        const leagues = await League.find({});
        return leagues;
    }

    async getLeague(userId) {
        const league = await League.findById(userId);
        return league;
    }

    async addLeague(body) {
        const newLeague = await new League(body);
        const league = await newLeague.save();

        return league;
    }

    async updateLeague(leaguesId, newLeague) {
        const result = await League.findByIdAndUpdate(leaguesId, newLeague, {new: true});
        return result;
    }

    async deleteLeague(leaguesId) {
        const result = await League.findByIdAndDelete(leaguesId);
        return result;
    }

    async addLeagueUser(body, leaguesId) {

        const league = await League.findById(leaguesId);
        league.users.push(body._id);
        await league.save();
        return league;
    }

}

module.exports = Service;
