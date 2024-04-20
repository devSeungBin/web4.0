const keys = require('../config/dev');

const express = require("express");
const router = express.Router();

const db = require('../models/DB');
const { User } = db;

const { sign, verify, refresh, refreshVerify } = require('../utils/jwt-util');
const jwt = require('jsonwebtoken');


// (세션 확인) 로직
const auth = require('../middleware/auth');
router.use(['/auth', '/logout'], auth);


router.get('/refresh', async (req, res) => {
    console.log('[Server] GET 요청 도착 (uri: /users/refresh)');

    if (req.cookies.accessToken && req.cookies.refreshToken) {
        const accessToken = req.cookies.accessToken;
        const refreshToken = req.cookies.refreshToken;

        const accessResult = verify(accessToken);
        const decoded = jwt.decode(accessToken);
        
        if (decoded === null) {
            return res.status(400).json({
                refreshSuccess: false,
                message: '유효하지 않은 accessToken입니다.',
                redirectURI: '/users/login',
            });
        }
        
        const refreshResult = refreshVerify(refreshToken, decoded.id);
        refreshResult.then( async (response) => {
            if (accessResult.verify === false && accessResult.error === "TokenExpiredError") {
           
                if (response.refreshVerify === false) {
                    return res.status(400).json({
                        refreshSuccess: false,
                        message: 'refreshToken이 만료됐습니다.',
                        redirectURI: '/users/login',
                    });                  
                } else {
                    const user = await User.findOne({ where: { email: decoded.email } });
                    const newAccessToken = sign(user);
    
                    return res.status(200).json({
                        refreshSuccess: true,
                        message: '토큰을 성공적으로 재발급 했습니다.',
                        accessToken: newAccessToken,
                    }); 
                }
            } else {
                return res.status(400).json({
                    refreshSuccess: false,
                    message: '아직 유효한 토큰입니다.',
                    redirectURI: '/users/login',
                }); 
            }
        });

    } else {
        return res.status(400).json({
            refreshSuccess: false,
            message: 'accessToken 또는 refreshToken이 존재하지 않습니다.',
            redirectURI: '/users/login',
        }); 
    }
});

// auth (GET)
router.get('/auth', async (req, res) => {
    console.log('[Server] GET 요청 도착 (uri: /users/auth)');

    if (!req.auth.verify) {
        if (req.auth.error === "TokenExpiredError") {
            return res.status(400).json({
                isAuth: false, 
                message: req.auth.error,
                redirectURI: '/users/refresh',
            });
        }

        return res.status(400).json({
            isAuth: false, 
            message: req.auth.message,
            redirectURI: '/users/login',
        });

    } else {

        return res.status(200).json({
            isAuth: true, 
            message: "인증 성공",
            user: req.auth,
        });
    }
});

// 회원가입 라우팅 (POST)
router.post('/registrations', async (req, res) => {
    console.log('[Server] POST 요청 도착 (uri: /users/registrations)');

    try {
        if (await User.findOne({ where: { email: req.body.email } })) {
            return res.status(400).json({
                registrationsSuccess: false, 
                message: "동일한 이메일을 가지는 사용자가 존재합니다.",
            });
        }

        const user = await User.create(req.body);
        return res.status(200).json({
            registrationsSuccess: true, 
            message: "회원가입에 성공했습니다.",
            redirectURI: '/users/login',
        });

    } catch (error) {
        if(keys.IS_DEV) {
            console.log(error);
        }

        return res.status(500).json({
            registrationsSuccess: false, 
            message: "회원가입 도중 에러가 발생했습니다.",
        });
    }
});

// 로그인 라우팅 (POST)
router.post('/login', async (req, res) => {
    console.log('[Server] POST 요청 도착 (uri: /users/login)');

    try {
        const user = await User.findOne({ where: { email: req.body.email } });
        if (!user) {
            return res.status(400).json({
                loginSuccess: false,
                message: "이메일 또는 비밀번호가 일치하지 않습니다.",
            });
        }
        
        const isMatch = user.comparePassword(user.dataValues.password, req.body.password);
        if (!isMatch) {
            return res.status(400).json({
                loginSuccess: false,
                message: "이메일 또는 비밀번호가 일치하지 않습니다.",
            });
        }
        
        const accessToken = sign(user);
        const refreshToken = refresh();

        const isSave = user.saveToken(user, refreshToken);
        if (!isSave) {
            return res.status(500).json({
                loginSuccess: false,
                message: "로그인 도중 에러가 발생했습니다.",
            });
        }
        
        return res.status(200).json({
            loginSuccess: true, 
            message: "로그인에 성공했습니다.",
            redirectURI: '/',
            accessToken: accessToken,
            refreshToken: refreshToken,
        });

    } catch (error) {
        if(keys.IS_DEV) {
            console.log(error);
        }

        return res.status(500).json({
            loginSuccess: false, 
            message: "로그인 도중 에러가 발생했습니다.",
        });
    }
});

// 로그아웃 라우팅 (GET) - 세션 필요
router.get('/logout', async (req, res) => {
    console.log('[Server] POST 요청 도착 (uri: /users/logout)');
    
    if (!req.auth.verify) {
        if (req.auth.error === "tokenNotFound") {
            return res.status(400).json({
                isAuth: false, 
                message: req.auth.error,
                redirectURI: '/users/login',
            });
        }
    }

    // res.clearCookie('accessToken');
    // res.clearCookie('refreshToken');

    return res.status(200).json({
        logoutSuccess: true, 
        message: "로그아웃에 성공했습니다.",
        redirectURI: '/',
    });
});



module.exports = router;
