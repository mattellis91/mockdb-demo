import express from 'express';
import { verifyToken } from '../middleware/auth';
import { Responses } from '@mattellis91/mockdb';
import slugify from 'slugify';

const articlesRouter = express.Router();

articlesRouter.get('/feed', (req, res) => {
    const articleCollection = req.app.locals.dbConnection.collection('articles');
    const articles = articleCollection.find();
    res.send({
        articles: articles.data,
        articlesCount: articles.data.length
    })
});

articlesRouter.post('/', verifyToken, (req, res) => {
    const articleCollection = req.app.locals.dbConnection.collection('articles');
    const article = req.body.article;

    const userCollection = req.app.locals.dbConnection.collection('users');
    
    const existingUserResponse = userCollection.findById(
        ((req as unknown as Record<string, unknown>).user as Record<string, unknown>).user_id
    )

    if (existingUserResponse.status !== Responses.SUCCESS) {
        res.status(500).send("Something went wrong");
    }

    const newArticle = {
        ...article,
        author: existingUserResponse.data[0].username,
        slug: slugify(article.title),
    }

    articleCollection.insertOne(newArticle);

    if (existingUserResponse.status === Responses.SUCCESS) {
        res.send({
            article: newArticle
        });
    } else {
        res.status(500).send("Something went wrong");
    }

});

articlesRouter.get('/:slug', (req, res) => {
    const articleCollection = req.app.locals.dbConnection.collection('articles');
    const slug = req.params?.slug;
    const articleRes = articleCollection.find({ slug: slug });
    console.log(articleRes.data);
    if(articleRes.status === Responses.SUCCESS) {
        res.send({
            article: articleRes.data[0]
        });
    } else {
        res.status(404).send("Something went wrong");
    }
});


module.exports = articlesRouter;
