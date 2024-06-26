import express from 'express';

const articlesRouter = express.Router();

articlesRouter.get('/', (req, res) => {
    
});

articlesRouter.get('/feed', (req, res) => {
    const articleCollection = req.app.locals.dbConnection.collection('articles');
    const articles = articleCollection.find();
    res.send({
        articles: articles.data,
        articlesCount: articles.data.length
    })
});

module.exports = articlesRouter;
