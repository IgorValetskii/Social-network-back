const User = require('../models/user');
const League = require('../models/leagues');
const Race = require('../models/races');
const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');

class Service {
    constructor() {

    }

    async getAllUsers() {
        const users = await User.find({});
        return users;
    }

    async getUser(token) {
     const zui = jwt.verify(token, 'secretkey');
        const userId = zui.user[0]._id;
        const user = await User.findById(userId);
        return user;
    }

    async addUser(body) {
        const newUser = new User(body);
        return await newUser.save();
    }

    async updateUser1(id, userIdWhoSentRequest) {
        const user = await User.findById(id);
        user.friendRequests.push(userIdWhoSentRequest);
        return await user.save();

        //
        // console.log(user);
        // console.log(userId)
        // const result = await User.findByIdAndUpdate(userId, newUser, {new: true});
        // return result;
    }

    async updateUser2(id, userIdWhoSentRequest) {
        const user = await User.findById(id);
        user.outgoingFriendRequests.push(userIdWhoSentRequest);
        return await user.save();
    }

    async friendChange(body, ownId) {
        //добавили в массив ДРУЗЬЯ
        const {userId} = body;
        const user = await User.findById(ownId);
        user.friends.push(userId);
        // user.friendRequests.push(userId);
        //убрали с входящих запросов
        const a = user.friendRequests.filter(el => el !== userId);
        user.friendRequests = a;
        return await user.save();
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
