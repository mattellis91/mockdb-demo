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
    const authorData = {};
    if (articles.data.length) {
        const authorCollection = req.app.locals.dbConnection.collection('users');
        for (let i = 0; i < articles.data.length; i++) {
            if (!authorData[articles.data[i].author]) {
                const authorResponse = authorCollection.findById(articles.data[i].author);
                if (authorResponse.status === mockdb_1.Responses.SUCCESS) {
                    delete authorResponse.data[0].password;
                    authorData[articles.data[i].author] = authorResponse.data[0];
                    articles.data[i].author = authorResponse.data[0];
                }
            }
            else {
                articles.data[i].author = authorData[articles.data[i].author];
            }
        }
    }
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
    const newArticle = Object.assign(Object.assign({}, article), { author: existingUserResponse.data[0]._id, slug: (0, slugify_1.default)(article.title) });
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
articlesRouter.put('/:slug', auth_1.verifyToken, (req, res) => {
    var _a;
    const articleCollection = req.app.locals.dbConnection.collection('articles');
    const article = req.body.article;
    const slug = (_a = req.params) === null || _a === void 0 ? void 0 : _a.slug;
    const articleRes = articleCollection.find({ slug: slug });
    if (articleRes.status === mockdb_1.Responses.SUCCESS) {
        const newSlug = (0, slugify_1.default)(article.title);
        articleCollection.updateOne({ slug: slug }, { $set: Object.assign(Object.assign({}, article), { slug: newSlug }) });
        res.send({
            article: Object.assign(Object.assign({}, article), { slug: newSlug })
        });
    }
    else {
        res.status(404).send("Something went wrong");
    }
});
articlesRouter.get('/:slug', (req, res) => {
    var _a;
    const articleCollection = req.app.locals.dbConnection.collection('articles');
    const slug = (_a = req.params) === null || _a === void 0 ? void 0 : _a.slug;
    console.log(slug);
    const articleRes = articleCollection.find({ slug: slug });
    console.log(articleRes.data);
    if (articleRes.status === mockdb_1.Responses.SUCCESS) {
        const authorCollection = req.app.locals.dbConnection.collection('users');
        const authorResponse = authorCollection.findById(articleRes.data[0].author);
        if (authorResponse.status === mockdb_1.Responses.SUCCESS) {
            articleRes.data[0].author = authorResponse.data[0];
        }
        res.send({
            article: articleRes.data[0]
        });
    }
    else {
        res.status(404).send("Something went wrong");
    }
});
articlesRouter.delete('/:slug', auth_1.verifyToken, (req, res) => {
    var _a;
    const articleCollection = req.app.locals.dbConnection.collection('articles');
    const slug = (_a = req.params) === null || _a === void 0 ? void 0 : _a.slug;
    const articleRes = articleCollection.find({ slug: slug });
    console.log(articleRes.data[0]);
    if (articleRes.status === mockdb_1.Responses.SUCCESS) {
        articleCollection.remove({ slug: slug });
        res.send({
            article: articleRes.data[0]
        });
    }
    else {
        res.status(404).send("Something went wrong");
    }
});
module.exports = articlesRouter;
