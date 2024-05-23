const keys = require('../config/dev');

const express = require("express");
const router = express.Router();

const multer = require('multer');
const uuid4 = require('uuid4');
const path = require('path');

const imagePath = path.join(__dirname, '../public', 'profiles');

const db = require('../models/DB');
const { User } = db;


// 사용자 정보 조회
router.get('/', async (req, res) => {
    if(keys.IS_DEV) {
        console.log('[Server] GET 요청 도착 (uri: /users)');
    }

    try {
        const user = await User.findOne({ where: { id: req.query.user_id }, raw: true });
        if(!user) {
            return res.status(400).json({
                errorCode: 100, 
                msg: "사용자 정보 조회 도중 에러가 발생했습니다.",
            });
        }

        const userInfo = {
            id: user.id,
            name: user.name,
            profile: user.profile,
        }

        return res.status(200).json({
            msg: "사용자 정보 조회에 성공했습니다.",
            user: userInfo,
        });

    } catch (error) {
        if(keys.IS_DEV) {
            console.log(error);
        }

        return res.status(500).json({
            errorCode: 1,
            msg: "사용자 정보 조회 도중 에러가 발생했습니다."
        });
    }
});

// 사용자 정보 생성 (회원가입)
router.post('/', async (req, res) => {
    if(keys.IS_DEV) {
        console.log('[Server] POST 요청 도착 (uri: /users)');
    }

    const parse = req.body;

    // 회원가입에 필요한 정보가 누락된 경우
    if (!parse.name || !parse.email || !parse.password) {
        return res.status(400).json({
            errorCode: 110,
            msg: "회원가입 도중 에러가 발생했습니다."
        });
    }

    try {
        // 동일한 이메일을 사용하는 사용자가 이미 DB에 존재하는 경우
        if (await User.findOne({ where: { email: parse.email } })) {
            return res.status(400).json({
                errorCode: 111, 
                msg: "회원가입 도중 에러가 발생했습니다."
            });
        }

        const user = {
            name: parse.name,
            email: parse.email,
            password: parse.password,
        }

        if(req.file) {
            user.profile = req.file.path
        }
        
        await User.create(user);
        return res.status(200).json({
            msg: "회원가입에 성공했습니다.",
        });

    } catch (error) {
        if(keys.IS_DEV) {
            console.log(error);
        }

        return res.status(500).json({
            errorCode: 1,
            msg: "회원가입 도중 에러가 발생했습니다."
        });
    }

    // const upload = multer({
    //     storage: multer.diskStorage({
    //         filename(req, file, done) {
    //             const randomID = uuid4();
    //             const ext = path.extname(file.originalname);
    //             const filename = `${randomID}${ext}`;
    //             done(null, filename);
    //         },
    //         destination(req, file, done) {
    //             done(null, imagePath);
    //         }
    //     }),
    //     // limits: { fileSize : 1024*1024 },
    // }).single('pagoth');

    // upload(req, res, async (err) => {
    //     if (err) {
    //         return res.status(500).json({
    //             errorCode: 1,
    //             msg: "회원가입 도중 도중 에러가 발생했습니다.",
    //         });
    //     }

    //     const parse = JSON.parse(req.body.data);

    //     // 회원가입에 필요한 정보가 누락된 경우
    //     if (!parse.name || !parse.email || !parse.password) {
    //         return res.status(400).json({
    //             errorCode: 110,
    //             msg: "회원가입 도중 에러가 발생했습니다."
    //         });
    //     }

    //     try {
    //         // 동일한 이메일을 사용하는 사용자가 이미 DB에 존재하는 경우
    //         if (await User.findOne({ where: { email: parse.email } })) {
    //             return res.status(400).json({
    //                 errorCode: 111, 
    //                 msg: "회원가입 도중 에러가 발생했습니다."
    //             });
    //         }

    //         const user = {
    //             name: parse.name,
    //             email: parse.email,
    //             password: parse.password,
    //         }

    //         if(req.file) {
    //             user.profile = req.file.path
    //         }
            
    //         await User.create(user);
    //         return res.status(200).json({
    //             msg: "회원가입에 성공했습니다.",
    //         });

    //     } catch (error) {
    //         if(keys.IS_DEV) {
    //             console.log(error);
    //         }

    //         return res.status(500).json({
    //             errorCode: 1,
    //             msg: "회원가입 도중 에러가 발생했습니다."
    //         });
    //     }
    // });
});


module.exports = router;
