"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mockdb_1 = require("@mattellis91/mockdb");
const express_1 = __importDefault(require("express"));
const userRouter = express_1.default.Router();
const getErrorResponse = (message = 'Oops something went wrong') => {
    return {
        data: [],
        message: message
    };
};
//register new user
userRouter.post('/', (req, res) => {
    const userCollection = req.app.locals.dbConnection.collection('users');
    const existingUserResponse = userCollection.find({ username: req.body.user.username });
    console.log(existingUserResponse);
    if (existingUserResponse.status === mockdb_1.Responses.SUCCESS) {
        if (existingUserResponse.data.length === 0) {
            const userInsertResponse = userCollection.insertOne({
                username: req.body.user.username,
                email: req.body.user.email,
                password: req.body.user.password
            });
            console.log(userInsertResponse);
            if (userInsertResponse.status === mockdb_1.Responses.SUCCESS) {
                res.send({
                    'data': userInsertResponse.data[0],
                    'message': 'New user successfully registered'
                });
            }
            else {
                res.send(getErrorResponse());
            }
        }
        else {
            res.send({
                'data': [],
                'message': 'Username has already been taken'
            });
        }
    }
    else {
        res.send(getErrorResponse());
    }
});
//sign in user
userRouter.post('/login', (req, res) => {
    const userCollection = req.app.locals.dbConnection.collection('users');
    const existingUserResponse = userCollection.findOne({ email: req.body.user.email, password: req.body.user.password });
    if (existingUserResponse.status === mockdb_1.Responses.SUCCESS) {
        if (existingUserResponse.data.length) {
            res.send({
                data: [existingUserResponse.data[0]],
                message: 'User successfully logged in'
            });
        }
        else {
            res.send(getErrorResponse('Email or password is invalid'));
        }
    }
    else {
        res.send(getErrorResponse());
    }
});
module.exports = userRouter;
