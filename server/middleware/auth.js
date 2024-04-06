const db = require('../models/DB');
const jwt = require('jsonwebtoken');
const { User } = db;

const auth = async (req, res, next) => {
    
    const token = req.cookies.userAuth;
    if (!token) {
        return res.json({
            isAuth: false,
            error: "token doesn't exist",
        });
    }

    const user = await User.findOne({ where: { name: "root" } });
    user.findByToken(token, (error, user) => {
        if (error) {
            return error;
        }

        if (!user) {
            return res.json({
                isAuth: false,
                error: "user doesn't exist",
            });
        }

        req.token = token;
        req.user = user;
        next();
    });
}

module.exports = auth;