import { Responses } from '@mattellis91/mockdb';
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {verifyToken} from '../middleware/auth';

const profileRouter = express.Router();

profileRouter.post('/:userId/follow', async (req, res) => {

    const {followerId} = req.body;
    const userId = req.params?.userId;

    console.log(userId);

    if(!followerId) {
        res.status(400).send("follower id not provided");
    }

    const userCollection = req.app.locals.dbConnection.collection('users');
    const existingUserResponse = userCollection.findById(userId);

    console.log(existingUserResponse);
 
    if(existingUserResponse.status === Responses.SUCCESS) {
        const userUpdateResponse = userCollection.updateById(userId, {$push: {followers: followerId }});
            res.send({
                user: {
                    email:userUpdateResponse.data[0].email,
                    username:userUpdateResponse.data[0].username,
                    _id: userUpdateResponse.data[0]._id,
                    followers: userUpdateResponse.data[0].followers
                }
            });

    } else {
        res.status(500).send("Something went wrong");
    }
});

profileRouter.post('/:userId/unfollow', async (req, res) => {

    const {followerId} = req.body;
    const userId = req.params?.userId;

    console.log(userId);

    if(!followerId) {
        res.status(400).send("follower id not provided");
    }

    const userCollection = req.app.locals.dbConnection.collection('users');
    const existingUserResponse = userCollection.findById(userId);

    console.log(existingUserResponse);
 
    if(existingUserResponse.status === Responses.SUCCESS) {
        const userUpdateResponse = userCollection.updateById(userId, {$pullAll: {followers: [followerId] }});
            res.send({
                user: {
                    email:userUpdateResponse.data[0].email,
                    username:userUpdateResponse.data[0].username,
                    _id: userUpdateResponse.data[0]._id,
                    followers: userUpdateResponse.data[0].followers
                }
            });

    } else {
        res.status(500).send("Something went wrong");
    }
});

module.exports = profileRouter;
