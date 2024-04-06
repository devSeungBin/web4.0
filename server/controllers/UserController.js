const express = require("express");
const router = express.Router();

const db = require('../models/DB');
const { User } = db;

const auth = require('../middleware/auth');
router.use(['/auth', '/logout'], auth);

// routing (GET)
router.get('/auth', async (req, res) => {
    console.log('[Server] GET 요청 도착 (uri: /users/auth)');

    return res.status(200).json({
        isAuth: true,
        userInfo: req.user,
    });
});

router.get('/logout', async (req, res) => {
    console.log('[Server] GET 요청 도착 (uri: /users/logout)');

    const user = await User.findOne({ where: { id: req.user.id } });
    if (!user) {
        return res.status(500).json({
            logoutSuccess: false,
            error: "no user is founded",
        });
    }

    user.deleteToken(user, (error, user) => {
        if (!user) {
            return res.status(500).json({
                logoutSuccess: false,
                error: error.message,
            });
        }

        res.clearCookie('userAuth');
        return res.status(200).json({
            logoutSuccess: true, 
            userInfo: user,
        });
    });
});

// routing (POST)
router.post('/registrations', async (req, res) => {
    console.log('[Server] POST 요청 도착 (uri: /users/registrations)');
    console.log(req.body);

    try {
        const user = await User.create(req.body);
        return res.status(200).json({
            registerSuccess: true, 
            userInfo: user,
        });
    } catch (error) {
        return res.status(500).json({
            registerSuccess: false,
            error: error.message,
        });
    }
});

router.post('/login', async (req, res) => {
    console.log('[Server] POST 요청 도착 (uri: /users/login)');

    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
        return res.status(500).json({
            loginSuccess: false,
            error: "no user is founded",
        });
    }

    user.comparePassword(user.dataValues.password, req.body.password, (error, isMatch) => {
        if (!isMatch) {
            return res.status(500).json({
                loginSuccess: false,
                error: error.message,
            });
        }

        user.generateToken(user, (error, user) => {
            if (error) {
                return res.status(500).json({
                    loginSuccess: false,
                    error: error.message,
                });
            }

            res.cookie("userAuth", user.token).status(200).json({
                loginSuccess: true,
                userId: user.token,
            });
        });
    });
});

// routing (PUT)
router.put('/:id', (req, res) => {
    res.status(201).send('PUT: /users/:id');
});

// routing (DELETE)
router.delete('/:id', (req, res) => {
    res.status(201).send('DELETE: /users/:id');
});


module.exports = router;
