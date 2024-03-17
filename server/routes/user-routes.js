const express = require("express");
// const { getAllUser , signUp ,logIn } = require("../controller/user-contoller");
const userRouter = express.Router();

// userRouter.get("/",getAllUser);
// userRouter.post("/signup", signUp);
// userRouter.post("/login" , logIn);

userRouter.get('/', (req, res) => {
    res.render('index')
})

userRouter.get('/signup', (req, res) => {
    res.render('signup')
})

userRouter.get('/login', (req, res) => {
    res.render('login')
})

module.exports =  userRouter;