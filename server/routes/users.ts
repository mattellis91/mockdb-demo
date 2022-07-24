import { Responses } from '@mattellis91/mockdb';
import express from 'express';

const userRouter = express.Router();

const getErrorResponse = (message:string = 'Oops something went wrong') => {
    return {
        data: [],
        message: message
    }
} 

//register new user
userRouter.post('/', (req, res) => {
    const userCollection = req.app.locals.dbConnection.collection('users');
    const existingUserResponse = userCollection.find({username:req.body.user.username});
    console.log(existingUserResponse); 
    if(existingUserResponse.status === Responses.SUCCESS) {
        if(existingUserResponse.data.length === 0) {
            const userInsertResponse = userCollection.insertOne({
                username:req.body.user.username,
                email:req.body.user.email,
                password:req.body.user.password
            });
            console.log(userInsertResponse);
            if(userInsertResponse.status === Responses.SUCCESS) {
                res.send({
                    'data': userInsertResponse.data[0],
                    'message': 'New user successfully registered'
                });   
            } else {
                res.send(getErrorResponse());
            }
        } else {
            res.send({
                'data': [],
                'message': 'Username has already been taken'
            });    
        }
    } else {
        res.send(getErrorResponse());
    }
});

//sign in user
userRouter.post('/login', (req, res) => {
    const userCollection = req.app.locals.dbConnection.collection('users');
    const existingUserResponse = userCollection.findOne({email:req.body.user.email, password:req.body.user.password});
    if(existingUserResponse.status === Responses.SUCCESS) {
        if(existingUserResponse.data.length) {
            res.send({
                data: [existingUserResponse.data[0]],
                message: 'User successfully logged in'
            });
        } else {
            res.send(getErrorResponse('Email or password is invalid')); 
        }
    } else {
        res.send(getErrorResponse());
    }
});

module.exports = userRouter;
