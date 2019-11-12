const User = require('../models/user');
const League = require('../models/leagues');
const Race = require('../models/races');
const mongoose = require('mongoose');

class Service {
    constructor() {

    }

    async getAllUsers() {
        const users = await User.find({});
        return users;
    }

    async getUser(userId) {
        const user = await User.findById(userId);
        return user;
    }

    async addUser(body) {
        const newUser = new User(body);
        return await newUser.save();
    }

    async updateUser(userId, newUser) {
        const result = await User.findByIdAndUpdate(userId, newUser, {new: true});
        return result;
    }

    async deleteUser(userId) {
        const result = await User.findByIdAndDelete(userId);
        return result;
    }

    async getUserRaces(userId) {
        const id = mongoose.Types.ObjectId(userId);
        const result = await Race.aggregate( [
            {$match: {user: id}}
            ]);
        return result;
    }

    async getUserLeagues(userId) {
        const id = mongoose.Types.ObjectId(userId);
        const result = await League.aggregate( [
            {$match: {users: id}}
        ]);
        return result;
    }

}

module.exports = Service;
