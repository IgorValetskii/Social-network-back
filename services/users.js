const User = require('../models/user');
const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');

class Service {
    constructor() {

    }

    async getAllUsers() {
        const users = await User.find({});
        return users;
    }

    async friendReq(body){
        const {id,ownId} = body;
        const ownUser = await User.findById(ownId);
        ownUser.outgoingFriendRequests.push(id);
        const udatedOwnUser = await ownUser.save();

        const user = await User.findById(id);
        user.friendRequests.push(ownId);
        const updatedUser = await user.save();
        return {udatedOwnUser, updatedUser}
    }

    async addFriend(body){
        const {id,ownId} = body;
        console.log(id);
        console.log(ownId);
        const ownUser = await User.findById(ownId);
        //добавили в массив ДРУЗЬЯ
        ownUser.friends.push(id);
        //убрали с входящих запросов
        ownUser.friendRequests = ownUser.friendRequests.filter(el => el !== id);
        const udatedOwnUser = await ownUser.save();

        const user = await User.findById(id);
        //добавили в массив ДРУЗЬЯ
        user.friends.push(ownId);
        //убрали с исходящих запросов
        user.outgoingFriendRequests = user.outgoingFriendRequests.filter(el => el !== ownId);
        const updatedUser = await user.save();
        return {udatedOwnUser, updatedUser}
    }

    async getUser(id) {
        const user = await User.findById(id);

        // const incomingReqsNames = await user.friendRequests.map(async id => await id.findById(id));
        // console.log(user.friends);
        // const friend = await User.findById(user.friends[0]);
        //
        // const  incomingReqsNames =await user.friends.map(async id =>
        // {console.log('123')
        //  let asd = await User.findById(id);
        //     console.log(asd);
        //   let name = asd.firstName;
        //   let lastName = asd.lastName;
        //     return asd
        // });
        //
        // console.log(incomingReqsNames);
        // console.log(incomingReqsNames[0]);
        //
        // console.log(friend);


        return user;
    }

    async addUser(body) {
        const newUser = new User(body);
        return await newUser.save();
    }

}

module.exports = Service;
