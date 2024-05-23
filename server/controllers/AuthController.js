const keys = require('../config/dev');

const express = require("express");
const router = express.Router();

const db = require('../models/DB');
const { User } = db;

const { sign, refresh } = require('../utils/jwt-util');


// 미들웨어
const auth = require('../middlewares/auth');
router.use(['/', '/refresh', '/remove'], auth);


// 인증 토큰 확인 (세션 확인)
router.get('/', async (req, res) => {
    if(keys.IS_DEV) {
        console.log('[Server] GET 요청 도착 (uri: /auth)');
    }

    // 엑세스 토큰, 리프레시 토큰이 존재하는 경우
    if (req.auth.hasAccessToken && req.auth.hasRefreshToken) {

        // 엑세스 토큰이 유효한 경우
        if (req.auth.isAccessVaild) {
            try {
                const user = await User.findOne({ where: { id: req.auth.userInfo.id } });
                
                // 엑세스 토큰으로 사용자를 DB에서 찾을 수 없는 경우
                if (!user) {
                    return res.status(400).json({
                        errorCode: 203,
                        msg: "인증 도중 에러가 발생했습니다.",
                    });
                }

                // 엑세스 토큰으로 찾은 사용자 DB의 리프레시 토큰이 다른 경우
                if (!(req.cookies.refreshToken === user.dataValues.refreshToken)) {
                    return res.status(400).json({
                        errorCode: 204,
                        msg: "인증 도중 에러가 발생했습니다.",
                    });
                } else {
                    // 엑세스 토큰으로 찾은 사용자 DB의 리프레시 토큰이 같은 경우 
                    return res.status(200).json({
                        msg: "인증에 성공했습니다.",
                    });
                }
            } catch (error) {
                if(keys.IS_DEV) {
                    console.log(error);
                }

                return res.status(500).json({
                    errorCode: 1,
                    msg: "인증 도중 에러가 발생했습니다."
                });
            }

        } else {
            // 엑세스 토큰이 만료된 경우
            if (req.auth.accessError === "TokenExpiredError") {
                return res.status(400).json({
                    errorCode: 202,
                    msg: "인증 도중 에러가 발생했습니다.",
                });
            } else {
                // 엑세스 토큰이 유효하지 않은 경우
                return res.status(400).json({
                    errorCode: 201,
                    msg: "인증 도중 에러가 발생했습니다.",
                });
            }
        }
    } else {
        // 엑세스 토큰, 리프레시 토큰이 존재하지 않는 경우
        return res.status(400).json({
            errorCode: 200,
            msg: "인증 도중 에러가 발생했습니다.",
        });
    }
});

// 인증 토큰 재발급 (세션 유지)
router.get('/refresh', async (req, res) => {
    if(keys.IS_DEV) {
        console.log('[Server] GET 요청 도착 (uri: /auth/refresh)');
    }

    // 엑세스 토큰, 리프레시 토큰이 존재하는 경우
    if (req.auth.hasAccessToken && req.auth.hasRefreshToken) {

        // 엑세스 토큰이 만료되지 않은 경우
        if (req.auth.isAccessVaild) {
            return res.status(400).json({
                errorCode: 212,
                msg: "토큰 재발급 도중 에러가 발생했습니다.",
            });
        } else {
            // 엑세스 토큰이 만료된 경우
            if (req.auth.accessError === "TokenExpiredError") {
                try {
                    const user = await User.findOne({ where: { id: req.auth.userInfo.id } });
                    
                    // 엑세스 토큰으로 사용자를 DB에서 찾을 수 없는 경우
                    if (!user) {
                        return res.status(400).json({
                            errorCode: 214,
                            msg: "토큰 재발급 도중 에러가 발생했습니다.",
                        });
                    }
    
                    // 엑세스 토큰으로 찾은 사용자 DB의 리프레시 토큰이 다른 경우
                    if (!(req.cookies.refreshToken === user.dataValues.refreshToken)) {
                        return res.status(400).json({
                            errorCode: 215,
                            msg: "토큰 재발급 도중 에러가 발생했습니다.",
                        });
                    } else {
                        // 리프레시 토큰이 만료되지 않은 경우
                        if (req.auth.isRefreshVaild) {
                            const newAccessToken = sign(user);

                            return res.status(200).json({
                                msg: "토큰 재발급에 성공했습니다.",
                                accessToken: newAccessToken,
                            });
                        } else {
                            return res.status(400).json({
                                errorCode: 213,
                                msg: "토큰 재발급 도중 에러가 발생했습니다.",
                            });
                        }
                    }
                } catch (error) {
                    if(keys.IS_DEV) {
                        console.log(error);
                    }
    
                    return res.status(500).json({
                        errorCode: 1,
                        msg: "토큰 재발급 도중 에러가 발생했습니다."
                    });
                }

            } else {
                // 엑세스 토큰이 유효하지 않은 경우
                return res.status(400).json({
                    errorCode: 211,
                    msg: "토큰 재발급 도중 에러가 발생했습니다.",
                });
            }
        }
    } else {
        // 엑세스 토큰, 리프레시 토큰이 존재하지 않는 경우
        return res.status(400).json({
            errorCode: 210,
            msg: "재인증 도중 에러가 발생했습니다.",
        });
    }
});

// 인증 토큰 삭제 (로그아웃)
router.get('/remove', async (req, res) => {
    if(keys.IS_DEV) {
        console.log('[Server] GET 요청 도착 (uri: /auth/remove)');
    }
    
    // 엑세스 토큰, 리프레시 토큰이 존재하는 경우
    if (req.auth.hasAccessToken && req.auth.hasRefreshToken) {
        return res.status(200).json({
            msg: "로그아웃에 성공했습니다.",
        });
    } else {
        // 엑세스 토큰, 리프레시 토큰이 존재하지 않는 경우
        return res.status(400).json({
            errorCode: 220,
            msg: "로그아웃 도중 에러가 발생했습니다.",
        });
    }
});

// 인증 토큰 발급 (로그인)
router.post('/', async (req, res) => {
    if(keys.IS_DEV) {
        console.log('[Server] POST 요청 도착 (uri: /auth)');
    }

    try {
        const user = await User.findOne({ where: { email: req.body.email } });
        
        // 이메일에 해당하는 사용자가 DB에 존재하지 않는 경우
        if (!user) {
            return res.status(400).json({
                errorCode: 230,
                msg: "로그인 도중 에러가 발생했습니다.",
            });
        }
        
        // 비밀번호가 사용자 DB와 일치하지 않는 경우
        const isMatch = user.comparePassword(user.dataValues.password, req.body.password);
        if (!isMatch) {
            return res.status(400).json({
                errorCode: 230,
                msg: "로그인 도중 에러가 발생했습니다.",
            });
        }
        
        const accessToken = sign(user);
        const refreshToken = refresh();

        const isSave = user.saveToken(user, refreshToken);
        if (!isSave) {
            return res.status(500).json({
                errorCode: 1,
                msg: "로그인 도중 에러가 발생했습니다.",
            });
        }
        
        return res.status(200).json({
            msg: "로그인에 성공했습니다.",
            accessToken: accessToken,
            refreshToken: refreshToken,
        });

    } catch (error) {
        if(keys.IS_DEV) {
            console.log(error);
        }

        return res.status(500).json({
            errorCode: 1,
            msg: "로그인 도중 에러가 발생했습니다.",
        });
    }
});


module.exports = router;
