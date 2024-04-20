const { verify } = require('../utils/jwt-util');

const auth = async (req, res, next) => {

    if (!req.cookies.accessToken) {
        req.auth = {};
        req.auth.verify = false;
        req.auth.message = 'accessToken이 존재하지 않습니다.';
        req.auth.error = 'tokenNotFound';
        next();
    }

    req.auth = verify(req.cookies.accessToken);

    next();
}

module.exports = auth;