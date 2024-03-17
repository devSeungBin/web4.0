const express = require("express");
const userRouter = express.Router();

const User = require("../model/User");
// const { getAllUser, signUp, logIn  } = require('../controller/user-contoller');

userRouter.get('/', async (req, res) => {
    try {
        const users = await User.findAll();
        res.render('index', { users });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

userRouter.get('/signup', (req, res) => {
    res.render('signup');
});

userRouter.get('/login', (req, res) => {
    res.render('login');
});

module.exports =  userRouter;