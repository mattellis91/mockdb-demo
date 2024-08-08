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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = require("../middleware/auth");
const userRouter = express_1.default.Router();
//register new user
userRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body.user;
    if (!(username && email && password)) {
        res.status(400).send("All input is required");
    }
    const userCollection = req.app.locals.dbConnection.collection('users');
    const existingUserResponse = userCollection.find({ email: email });
    console.log(existingUserResponse);
    if (existingUserResponse.status === mockdb_1.Responses.SUCCESS) {
        if (existingUserResponse.data.length === 0) {
            const encryptedPassword = yield bcryptjs_1.default.hash(password, 10);
            const userInsertResponse = userCollection.insertOne({
                username: username,
                email: email,
                password: encryptedPassword,
                image: `https://avatar.iran.liara.run/username?username=${username}`
            });
            const token = jsonwebtoken_1.default.sign({ user_id: userInsertResponse.data[0]._id, email }, process.env.TOKEN_KEY, {
                expiresIn: '2h'
            });
            res.send({
                user: {
                    email: email,
                    token: token,
                    username: username
                }
            });
        }
        else {
            res.status(409).send("User with email already exists");
        }
    }
    else {
        res.status(500).send("Something went wrong");
    }
}));
//get current user
userRouter.get('/', auth_1.verifyToken, (req, res) => {
    const userCollection = req.app.locals.dbConnection.collection('users');
    const existingUserResponse = userCollection.findById(req.user.user_id);
    if (existingUserResponse.status === mockdb_1.Responses.SUCCESS) {
        res.send({
            user: {
                email: existingUserResponse.data[0].email,
                token: req.token,
                username: existingUserResponse.data[0].username
            }
        });
    }
    else {
        res.status(500).send("Something went wrong");
    }
});
//sign in user
userRouter.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body.user;
    if (!(email && password)) {
        res.status(400).send("All input is required");
    }
    const userCollection = req.app.locals.dbConnection.collection('users');
    const existingUserResponse = userCollection.findOne({ email: email });
    if (existingUserResponse.status === mockdb_1.Responses.SUCCESS) {
        if (existingUserResponse.data.length && (yield bcryptjs_1.default.compare(password, existingUserResponse.data[0].password))) {
            const token = jsonwebtoken_1.default.sign({ user_id: existingUserResponse.data[0]._id, email }, process.env.TOKEN_KEY, {
                expiresIn: "2h"
            });
            res.send({
                user: {
                    email: email,
                    token: token,
                    username: existingUserResponse.data[0].username
                }
            });
        }
        else {
            res.status(401).send('Email or password is invalid');
        }
    }
    else {
        res.status(500).send("Something went wrong");
    }
}));
module.exports = userRouter;
