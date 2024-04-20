const keys = require('../config/dev');
const jwt = require('jsonwebtoken');

const db = require('../models/DB');
const { User } = db;

const accessKey = keys.JWT_ACCESS_TOKEN;
const refreshKey = keys.JWT_REFRESH_TOKEN;


module.exports = {
    sign: (user) => {
        const payload = {
            id: user.dataValues.id,
            name: user.dataValues.name,
            email: user.dataValues.email,
            role: user.dataValues.role,
        }

        return jwt.sign(payload, accessKey, {
            algorithm: 'HS256',
            expiresIn: '10s',
        })
    },
    verify: (token) => {
        let decoded = null;
        try {
            decoded = jwt.verify(token, accessKey);
            return {
                verify: true,
                id: decoded.id,
                name: decoded.name,
                email: decoded.email,
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
            expiresIn: '20s',
        });
    },
    refreshVerify: async (token, userId) => {
        try {
            const user = await User.findOne({ where: { id: userId } });
            if (token === user.dataValues.refreshToken) {
                try {
                    jwt.verify(token, refreshKey);
                    return {
                        refreshVerify: true,
                    }
                } catch (error) {
                    return {
                        refreshVerify: false,
                        message: 'Refresh Token 인증 에러: jwt error',
                    }
                }
            } else {
                return {
                    refreshVerify: false,
                    message: 'Refresh Token 인증 에러: different token',
                }
            }
        } catch (error) {
            return {
                refreshVerify: false,
                message: 'Refresh Token 인증 에러: user not found',
            }
        }
    },
};