const keys = require('../config/dev');
const jwt = require('jsonwebtoken');

const db = require('../models/DB');
const { User } = db;

const accessKey = keys.JWT_ACCESS_TOKEN;
const refreshKey = keys.JWT_REFRESH_TOKEN;
const inviteKey = keys.JWT_INVITE_TOKEN;


module.exports = {
    sign: (user) => {
        const payload = {
            id: user.dataValues.id,
            name: user.dataValues.name,
            role: user.dataValues.role,
        }

        return jwt.sign(payload, accessKey, {
            algorithm: 'HS256',
            expiresIn: '1h',
            issuer : 'pagoth',
        });
    },
    verify: (token) => {
        let decoded = null;
        try {
            decoded = jwt.verify(token, accessKey);
            return {
                verify: true,
                id: decoded.id,
                name: decoded.name,
                role: decoded.role,
            }
        } catch (error) {
            return {
                verify: false,
                message: 'Access Token 인증 에러: jwt error',
                error: error.name,
            }
        }
    },
    refresh: () => {
        return jwt.sign({}, refreshKey, {
            algorithm: 'HS256',
            expiresIn: '2h',
            issuer : 'pagoth',
        });
    },
    refreshVerify: async (token, userId) => {
        let decoded = null;
        try {
            const user = await User.findOne({ where: { id: userId } });
            if (token === user.dataValues.refreshToken) {
                try {
                    decoded = jwt.verify(token, refreshKey);
                    return {
                        refreshVerify: true,
                        exp: decoded.exp,
                    }
                } catch (error) {
                    return {
                        refreshVerify: false,
                        message: 'Refresh Token 인증 에러: jwt error',
                        error: error.name,
                    }
                }
            } else {
                return {
                    refreshVerify: false,
                    message: 'Refresh Token 인증 에러: different token',
                    error: 'differentTokenError',
                }
            }
        } catch (error) {
            return {
                refreshVerify: false,
                message: 'Refresh Token 인증 에러: user not found',
                error: error.name,
            }
        }
    },
    invite: (user_id, gallery_id) => {
        const payload = {
            gallery_id: gallery_id,
            id: user_id,
        }

        return jwt.sign(payload, inviteKey, {
            algorithm: 'HS256',
            expiresIn: '3m',
            issuer : 'pagoth',
        });
    },
    inviteVerify: (token) => {
        let decoded = null;
        try {
            decoded = jwt.verify(token, inviteKey);
            return {
                verify: true,
                gallery_id: decoded.gallery_id,
                id: decoded.user_id,
            }
        } catch (error) {
            return {
                verify: false,
                message: 'Access Token 인증 에러: jwt error',
                error: error.name,
            }
        }
    },
};