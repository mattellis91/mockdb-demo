"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const articlesRouter = express_1.default.Router();
articlesRouter.get('/feed', (req, res) => {
    res.send({ 'trst': 'sdfsdf' });
});
module.exports = articlesRouter;
