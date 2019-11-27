const Service = require('../services/users');
const service = new Service();


class Controller {
    constructor() {
    }

    async getAllUsers(req, res, next) {
        const result = await service.getAllUsers();
        res.status(200).json(result);
    }

    async friendReq(req,res){
        const body = req.body;
        const result = await service.friendReq(body);
        console.log(result);
        if(result) res.send();

        // res.status(200).json(result);
    }

    async addFriend(req,res){
        const body = req.body;
        const result = await service.addFriend(body);
        console.log(result);

        // res.status(200).json(result);
    }

    async getUserLogIn(req, res, next) {
        console.log('я в контроллере getUserLogIn  ');
        // console.log(req);
        // const {userId} = req.params;
        const result = await service.getUserLogIn(req.token);
        res.status(200).json(result);
    }

    async getUser(req, res, next) {
        // console.log(req.params);
        const {id} = req.params;
        const result = await service.getUser(id);
        res.status(200).json(result);
    }

    async addUser(req, res, next) {
        const body = req.body;
        // console.log(body)
        const result = await service.addUser(body);
        res.status(201).json(result);

    }


    async updateUser(req, res, next) {
            //считываю токен с хедера декодирую, проверяю поле IsAdmin true или false.
        // если false отправляю  У Вас нет прав
        // если true вызываю сервис.
        const {id} = req.params;
        const body = req.body;

        if(body.incomingFriendReq){
            const userIdWhoSentRequest = body.incomingFriendReq;
            const result = await service.updateUser1(id,userIdWhoSentRequest);
            res.status(200).json(result);
        } else{
            const userIdWhoSentRequest = body.outgoingFriendReq;
            const result = await service.updateUser2(id,userIdWhoSentRequest);
            res.status(200).json(result);
        }

    }

    async incomingFriendChange(req, res, next) {
        const {id} = req.params;
        const ownId = id;
        const body = req.body;
        const result = await service.incomingFriendsChange(body,ownId);
        res.status(200).json(result);
    }

    async outgoingFriendsChange(req, res, next) {
        const {id} = req.params;
        const ownId = id;
        const body = req.body;
        const result = await service.outgoingFriendsChange(body,ownId);
        res.status(200).json(result);
    }

    async createObjFriend(req, res, next){
        const {id} = req.params;

    }

    async deleteUser(req, res, next){
        const {userId} = req.params;
        const result = await service.deleteUser(userId);
        if (result) res.status(200).send('User successfully deleted');
    }

    async getUserRaces(req,res){
        const {userId} = req.params;
        const result = await service.getUserRaces(userId);
        res.status(200).json(result);
    }

    async getUserLeagues(req,res){
        const {userId} = req.params;
        const result = await service.getUserLeagues(userId);
        res.status(200).json(result);
    }

}

module.exports = Controller;
