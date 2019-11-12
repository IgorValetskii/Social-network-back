const Stage = require('../models/stages');

class Service {
    constructor() {

    }

    async getAllStages() {
        const stages = await Stage.find({});
        return stages;
    }

    async getStage(stagesId) {
        const stage = await Stage.findById(stagesId);
        return stage;
    }

    async addStage(body) {
        const newStage = await new Stage(body);
        const stage = await newStage.save();

        return stage;
    }

    async updateStage(stagesId, newStage) {
        const result = await Stage.findByIdAndUpdate(stagesId, newStage, {new: true});
        return result;
    }

    async deleteStage(stagesId) {
        const result = await Stage.findByIdAndDelete(stagesId);
        return result;
    }

}

module.exports = Service;
