import express from 'express';

const tagsRouter = express.Router();

tagsRouter.get('/', (req, res) => {

    const tagsCollection = req.app.locals.dbConnection.collection('tags');
    const tags = tagsCollection.find();
    res.send({
        tags: tags.data.map((tag:any) => tag.tag),
    });

});

module.exports = tagsRouter;
