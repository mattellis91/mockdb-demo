"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tagsRouter = express_1.default.Router();
tagsRouter.get('/', (req, res) => {
    const tagsCollection = req.app.locals.dbConnection.collection('tags');
    const tags = tagsCollection.find();
    res.send({
        tags: tags.data.map((tag) => tag.tag),
    });
});
module.exports = tagsRouter;
