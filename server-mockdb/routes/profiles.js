"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mockdb_1 = require("@mattellis91/mockdb");
const express_1 = __importDefault(require("express"));
const profileRouter = express_1.default.Router();
profileRouter.post('/:userId/follow', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { followerId } = req.body;
    const userId = (_a = req.params) === null || _a === void 0 ? void 0 : _a.userId;
    console.log(userId);
    if (!followerId) {
        res.status(400).send("follower id not provided");
    }
    const userCollection = req.app.locals.dbConnection.collection('users');
    const existingUserResponse = userCollection.findById(userId);
    console.log(existingUserResponse);
    if (existingUserResponse.status === mockdb_1.Responses.SUCCESS) {
        const userUpdateResponse = userCollection.updateById(userId, { $push: { followers: followerId } });
        res.send({
            user: {
                email: userUpdateResponse.data[0].email,
                username: userUpdateResponse.data[0].username,
                _id: userUpdateResponse.data[0]._id,
                followers: userUpdateResponse.data[0].followers
            }
        });
    }
    else {
        res.status(500).send("Something went wrong");
    }
}));
profileRouter.post('/:userId/unfollow', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { followerId } = req.body;
    const userId = (_a = req.params) === null || _a === void 0 ? void 0 : _a.userId;
    console.log(userId);
    if (!followerId) {
        res.status(400).send("follower id not provided");
    }
    const userCollection = req.app.locals.dbConnection.collection('users');
    const existingUserResponse = userCollection.findById(userId);
    console.log(existingUserResponse);
    if (existingUserResponse.status === mockdb_1.Responses.SUCCESS) {
        const userUpdateResponse = userCollection.updateById(userId, { $pullAll: { followers: [followerId] } });
        res.send({
            user: {
                email: userUpdateResponse.data[0].email,
                username: userUpdateResponse.data[0].username,
                _id: userUpdateResponse.data[0]._id,
                followers: userUpdateResponse.data[0].followers
            }
        });
    }
    else {
        res.status(500).send("Something went wrong");
    }
}));
module.exports = profileRouter;
