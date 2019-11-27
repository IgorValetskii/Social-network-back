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
    }

    async addFriend(req,res){
        const body = req.body;
        const result = await service.addFriend(body);
        console.log(result);

        // res.status(200).json(result);
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
}

module.exports = Controller;
