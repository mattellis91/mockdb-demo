import { Responses } from '@mattellis91/mockdb';
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {verifyToken} from '../middleware/auth';

const userRouter = express.Router();

//register new user
userRouter.post('/', async (req, res) => {

    const {username, email, password} = req.body.user;

    if(!(username && email && password)) {
        res.status(400).send("All input is required");
    }

    const userCollection = req.app.locals.dbConnection.collection('users');
    const existingUserResponse = userCollection.find({email:email});

    console.log(existingUserResponse);
 
    if(existingUserResponse.status === Responses.SUCCESS) {
        if(existingUserResponse.data.length === 0) {
            const encryptedPassword = await bcrypt.hash(password, 10);
            const userInsertResponse = userCollection.insertOne({
                username:username,
                email:email,
                password:encryptedPassword
            });

            const token = jwt.sign(  
                {user_id: userInsertResponse.data[0]._id, email },
                process.env.TOKEN_KEY as string,
                {
                    expiresIn: '2h'
                }
            );

            res.send({
                user: {
                    email:email,
                    token:token,
                    username:username
                }
            });

        } else {
            res.status(409).send("User with email already exists");   
        }
    } else {
        res.status(500).send("Something went wrong");
    }
});

//get current user
userRouter.get('/', verifyToken, (req,res) => {
    const userCollection = req.app.locals.dbConnection.collection('users');
    
    const existingUserResponse = userCollection.findById(
        ((req as unknown as Record<string, unknown>).user as Record<string, unknown>).user_id
    )

    if(existingUserResponse.status === Responses.SUCCESS) {
        res.send({
            user: {
                email:existingUserResponse.data[0].email,
                token:(req as unknown as Record<string, unknown>).token,
                username:existingUserResponse.data[0].username
            }
        });   
    } else {
        res.status(500).send("Something went wrong");
    }
});

//sign in user
userRouter.post('/login', async (req, res) => {

    const {email, password} = req.body.user;

    if(!(email && password)) {
        res.status(400).send("All input is required");
    }
    
    const userCollection = req.app.locals.dbConnection.collection('users');
    const existingUserResponse = userCollection.findOne({email:email});

    
    if(existingUserResponse.status === Responses.SUCCESS) {
        if(existingUserResponse.data.length && (await bcrypt.compare(password, existingUserResponse.data[0].password))) {
            
            const token = jwt.sign(
                {user_id: existingUserResponse.data[0]._id, email},
                process.env.TOKEN_KEY as string,
                {
                    expiresIn: "2h"
                }
            );

            res.send({
                user: {
                    email:email,
                    token:token,
                    username:existingUserResponse.data[0].username
                }
            });

        } else {
            res.status(401).send('Email or password is invalid'); 
        }
    } else {
        res.status(500).send("Something went wrong");
    }
});

module.exports = userRouter;
