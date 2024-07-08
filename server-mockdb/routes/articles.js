"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const mockdb_1 = require("@mattellis91/mockdb");
const slugify_1 = __importDefault(require("slugify"));
const articlesRouter = express_1.default.Router();
articlesRouter.get('/feed', (req, res) => {
    const articleCollection = req.app.locals.dbConnection.collection('articles');
    const articles = articleCollection.find();
    res.send({
        articles: articles.data,
        articlesCount: articles.data.length
    });
});
articlesRouter.post('/', auth_1.verifyToken, (req, res) => {
    const articleCollection = req.app.locals.dbConnection.collection('articles');
    const article = req.body.article;
    const userCollection = req.app.locals.dbConnection.collection('users');
    const existingUserResponse = userCollection.findById(req.user.user_id);
    if (existingUserResponse.status !== mockdb_1.Responses.SUCCESS) {
        res.status(500).send("Something went wrong");
    }
    const newArticle = Object.assign(Object.assign({}, article), { author: existingUserResponse.data[0].username, slug: (0, slugify_1.default)(article.title) });
    articleCollection.insertOne(newArticle);
    if (existingUserResponse.status === mockdb_1.Responses.SUCCESS) {
        res.send({
            article: newArticle
        });
    }
    else {
        res.status(500).send("Something went wrong");
    }
});
articlesRouter.get('/:slug', (req, res) => {
    var _a;
    const articleCollection = req.app.locals.dbConnection.collection('articles');
    const slug = (_a = req.params) === null || _a === void 0 ? void 0 : _a.slug;
    const articleRes = articleCollection.find({ slug: slug });
    console.log(articleRes.data);
    if (articleRes.status === mockdb_1.Responses.SUCCESS) {
        res.send({
            article: articleRes.data[0]
        });
    }
    else {
        res.status(404).send("Something went wrong");
    }
});
module.exports = articlesRouter;
