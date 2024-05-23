const keys = require('../config/dev');

const express = require("express");
const router = express.Router();

const db = require('../models/DB');
const { Gallery, GalleryUser } = db;

const { invite, inviteVerify } = require('../utils/jwt-util');


// 미들웨어
const auth = require('../middlewares/auth');
router.use(['/join'], auth);

const galleryAuth = require('../middlewares/galleryAuth');
router.use(['/all', '/invite'], auth, galleryAuth);


// 갤러리 전체 유저 정보 조회
router.get('/all', async (req, res) => {
    if(keys.IS_DEV) {
        console.log('[Server] GET 요청 도착 (uri: /galleries/users/all)');
    }

    if (!req.galleryAuth.galleryExist) {
        return res.status(400).json({
            errorCode: 400, 
            msg: "갤러리 전체 유저 정보 조회 도중 에러가 발생했습니다.",
        });

    } else if (!req.galleryAuth.isMember) {
        return res.status(400).json({
            errorCode: 401, 
            msg: "갤러리 전체 유저 정보 조회 도중 에러가 발생했습니다.",
        });
    }

    try {
        const galleryUser = await GalleryUser.findAll({ where: { gallery_id: req.query.gallery_id }, raw: true });

        return res.status(200).json({
            msg: "갤러리 전체 유저 정보 조회에 성공했습니다.",
            users: galleryUser,
        });
    } catch(error) {
        if(keys.IS_DEV) {
            console.log(error);
        }

        return res.status(500).json({
            errorCode: 1,
            msg: "갤러리 전체 유저 정보 조회 도중 에러가 발생했습니다.",
        });
    }
});


// 갤러리 초대코드 생성
router.get('/invite', async (req, res) => {
    if(keys.IS_DEV) {
        console.log('[Server] GET 요청 도착 (uri: /galleries/users/invite)');
    }

    const userInfo = req.auth.userInfo;

    if (!req.galleryAuth.galleryExist) {
        return res.status(400).json({
            errorCode: 410, 
            msg: "갤러리 초대코드 생성 도중 에러가 발생했습니다.",
        });

    } else if (!req.galleryAuth.isMember) {
        return res.status(400).json({
            errorCode: 411, 
            msg: "갤러리 초대코드 생성 도중 에러가 발생했습니다.",
        });
    }

    const inviteCode = invite(userInfo.id, Number(req.query.gallery_id));
    return res.status(200).json({
        msg: "갤러리 초대코드 생성에 성공했습니다.",
        inviteCode: inviteCode,
    });

});

// 갤러리 참여
router.post('/join', async (req, res) => {
    if(keys.IS_DEV) {
        console.log('[Server] POST 요청 도착 (uri: /galleries/users/join)');
    }

    const userInfo = req.auth.userInfo;
    const inviteCode = req.body.inviteCode;
    const decoded = inviteVerify(inviteCode);

    if (!decoded.verify) {
        if (decoded.error === "TokenExpiredError") {
            return res.status(400).json({
                errorCode: 421, 
                msg: "갤러리 초대코드 생성 도중 에러가 발생했습니다.",
            });
        }

        return res.status(400).json({
            errorCode: 420, 
            msg: "갤러리 초대코드 생성 도중 에러가 발생했습니다.",
        });
    }

    // 참여할 갤러리가 존재하는지 확인
    const gallery = await Gallery.findOne({ where: { id: decoded.gallery_id }, raw: true })
    if (!gallery) {
        return res.status(400).json({
            errorCode: 422, 
            msg: "갤러리 초대코드 생성 도중 에러가 발생했습니다.",
        });
    }
    // 사용자가 해당 갤러리에 이미 참여하고 있는지 여부 확인
    const galleryUser = await GalleryUser.findOne({ where: { user_id: userInfo.id, gallery_id: decoded.gallery_id }, raw: true })
    if (galleryUser) {
        return res.status(400).json({
            errorCode: 423, 
            msg: "갤러리 초대코드 생성 도중 에러가 발생했습니다.",
        });
    }

    const addUser = {
        user_id: userInfo.id,
        gallery_id: decoded.gallery_id,
    }

    await GalleryUser.create(addUser);
    return res.status(200).json({
        msg: "갤러리 참여에 성공했습니다.",
    });
});



module.exports = router;
