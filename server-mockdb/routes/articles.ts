import express from 'express';
import { verifyToken } from '../middleware/auth';
import { Responses } from '@mattellis91/mockdb';
import slugify from 'slugify';

const articlesRouter = express.Router();

articlesRouter.get('/feed', (req, res) => {
    const articleCollection = req.app.locals.dbConnection.collection('articles');
    const articles = articleCollection.find();

    const authorData:Record<string, Record<string, unknown>> = {}

    if(articles.data.length) {

        const authorCollection = req.app.locals.dbConnection.collection('users');

        for(let i = 0; i < articles.data.length; i++) {
            if(!authorData[articles.data[i].author]) {
                const authorResponse = authorCollection.findById(articles.data[i].author);
                if(authorResponse.status === Responses.SUCCESS) {
                    authorData[articles.data[i].author] = authorResponse.data[0];
                    articles.data[i].author = authorResponse.data[0]
                }
            } else {
                articles.data[i].author = authorData[articles.data[i].author]
            }
        } 
    }

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

articlesRouter.put('/:slug', verifyToken, (req, res) => {
    const articleCollection = req.app.locals.dbConnection.collection('articles');
    const article = req.body.article;
    const slug = req.params?.slug;

    const articleRes = articleCollection.find({ slug: slug })

    if(articleRes.status === Responses.SUCCESS) {

        const newSlug =  slugify(article.title)
        articleCollection.updateOne({ slug: slug }, {$set: {
            ...article,
            slug: newSlug
        }});
        res.send({
            article: {...article, slug:newSlug}
        });
    } else {
        res.status(404).send("Something went wrong");
    }
});

articlesRouter.get('/:slug', (req, res) => {
    const articleCollection = req.app.locals.dbConnection.collection('articles');
    const slug = req.params?.slug;
    console.log(slug);
    const articleRes = articleCollection.find({ slug: slug });
    console.log(articleRes.data);
    if(articleRes.status === Responses.SUCCESS) {

        const authorCollection = req.app.locals.dbConnection.collection('users');
        const authorResponse = authorCollection.findById(articleRes.data[0].author);

        if(authorResponse.status === Responses.SUCCESS) {
            articleRes.data[0].author = authorResponse.data[0]
        }

        res.send({
            article: articleRes.data[0]
        });
    } else {
        res.status(404).send("Something went wrong");
    }
});

articlesRouter.delete('/:slug', verifyToken, (req, res) => {
    const articleCollection = req.app.locals.dbConnection.collection('articles');
    const slug = req.params?.slug;
    const articleRes = articleCollection.find({ slug: slug });

    console.log(articleRes.data[0])

    if(articleRes.status === Responses.SUCCESS) {
        articleCollection.remove({ slug: slug });
        res.send({
            article: articleRes.data[0]
        });
    } else {
        res.status(404).send("Something went wrong");
    }
});



module.exports = articlesRouter;
