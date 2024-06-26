"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const articlesRouter = express_1.default.Router();
articlesRouter.get('/', (req, res) => {
});
articlesRouter.get('/feed', (req, res) => {
    const articleCollection = req.app.locals.dbConnection.collection('articles');
    const articles = articleCollection.find();
    res.send({
        articles: articles.data,
        articlesCount: articles.data.length
    });
});
module.exports = articlesRouter;
