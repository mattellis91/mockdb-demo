import express from 'express';

const articlesRouter = express.Router();

articlesRouter.get('/feed', (req, res) => {
    res.send({'trst':'sdfsdf'});
});

module.exports = articlesRouter;
