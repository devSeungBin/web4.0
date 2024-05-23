const keys = require('../config/dev');
const { verify, refreshVerify } = require('../utils/jwt-util');
const jwt = require('jsonwebtoken');

const db = require('../models/DB');
const { User } = db;

const auth = async (req, res, next) => {

    // req.auth = {
    //     hasAccessToken (요청 헤더 쿠키에 accessToken이 존재하면 true) O
    //     isAccessVaild (accessToken이 accessKey로 정상적으로 복호화되면 true) O
    //     userInfo (복호화한 accessToken에서 사용자 정보를 추출) O
    //     accessError (accessToken 유효성 검사 실패 에러 이름) O
    //     hasRefreshToken (요청 헤더 쿠키에 refreshToken이 존재하면 true) O
    //     isRefreshVaild (refreshToken이 refreshKey로 정상적으로 복호화되면 true) O
    //     sessionExp (복호화한 refreshToken에서 세션 만료일을 추출) O
    //     refreshError (refreshToken 유효성 검사 실패 에러 이름) O
    // }

    req.auth = {};

    // 엑세스 토큰 여부 검사
    if (req.cookies.accessToken) {
        req.auth.hasAccessToken = true;

        // 엑세스 토큰 유효성 검사
        const result = verify(req.cookies.accessToken);
        if (result.verify) {
            req.auth.isAccessVaild = true;

        } else {
            if (keys.IS_DEV) {
                console.log(`[Debug] 엑세스 토큰 유효성 검사 에러: ${result.error}`);
            }

            req.auth.isAccessVaild = false;
            req.auth.accessError = result.error;
        }

        // 엑세스 토큰 복호화 후 사용자 정보 추출
        if (req.auth.isAccessVaild) {
            const decoded = jwt.decode(req.cookies.accessToken);
            if (decoded === null) {
                req.auth.userInfo = null;
            } else {
                req.auth.userInfo = {
                    id: decoded.id,
                    name: decoded.name,
                    role: decoded.role,
                };
            }
        }

    } else {
        req.auth.hasAccessToken = false;
    }

    // 리프레시 토큰 여부 검사
    if (req.cookies.refreshToken && req.auth.isAccessVaild) {

        const user = await User.findOne({ where: { refreshToken: req.cookies.refreshToken } });
                
        // 리프레시 토큰으로 사용자를 DB에서 찾을 수 없는 경우
        if (!user) {
            req.auth.hasRefreshToken = false;
        } else {
            req.auth.hasRefreshToken = true;
        }

        // 리프레시 토큰 유효성 검사
        const result = await refreshVerify(req.cookies.refreshToken, req.auth.userInfo.id);
        if (result.refreshVerify) {
            req.auth.isRefreshVaild = true;
        } else {
            if (keys.IS_DEV) {
                console.log(`[Debug] 리프레시 토큰 유효성 검사 에러: ${result.error}`);
            }

            req.auth.isRefreshVaild = false;
            req.auth.refreshError = result.error;
        }

        if (req.auth.hasRefreshToken) {
            // 리프레시 토큰 세션 만료일 추출
            const decoded = jwt.decode(req.cookies.refreshToken);
            if (decoded === null) {
                req.auth.sessionExp = null;
            } else {
                req.auth.sessionExp = decoded.exp;
            }
        }

    } else {
        req.auth.hasRefreshoken = false;
    }

    next();
}

module.exports = auth;
