const keys = require('../config/dev');

const express = require("express");
const router = express.Router();

const multer = require('multer');
const uuid4 = require('uuid4');
const path = require('path');

const imagePath = path.join(__dirname, '../public', 'images');

const db = require('../models/DB');
const { Image } = db;


// 미들웨어
const auth = require('../middlewares/auth');
const galleryAuth = require('../middlewares/galleryAuth');
router.use(['/'], auth, galleryAuth);


// 전체 이미지 정보 조회
router.get('/', async (req, res) => {
    if(keys.IS_DEV) {
        console.log('[Server] GET 요청 도착 (uri: /images)');
    }

    if (!req.galleryAuth.galleryExist) {
        return res.status(400).json({
            errorCode: 500, 
            msg: "전체 이미지 정보 조회 도중 에러가 발생했습니다."
        });

    } else if (!req.galleryAuth.isMember) {
        return res.status(400).json({
            errorCode: 501, 
            msg: "전체 이미지 정보 조회 도중 에러가 발생했습니다."
        });
    }

    try {
        let imageList = new Array();
        const image = await Image.findAll({ where: { gallery_id: req.query.gallery_id }, raw: true });
        image.forEach( async (image) => {
            imageList.push(image);
        });

        return res.setHeader('Access-Control-Allow-Origin','*').status(200).json({
            msg: "전체 이미지 정보 조회에 성공했습니다.",
            images: imageList,
        });

    } catch (error) {
        if(keys.IS_DEV) {
            console.log(error);
        }

        return res.status(500).json({
            errorCode: 1,
            msg: "전체 이미지 정보 조회 도중 에러가 발생했습니다."
        });
    }
});

// 이미지 정보 생성
router.post('/', async (req, res) => {
    if(keys.IS_DEV) {
        console.log('[Server] POST 요청 도착 (uri: /images)');
    }

    if (!req.galleryAuth.galleryExist) {
        return res.status(400).json({
            errorCode: 510, 
            msg: "이미지 정보 생성 도중 에러가 발생했습니다."
        });

    } else if (!req.galleryAuth.isMember) {
        return res.status(400).json({
            errorCode: 511, 
            msg: "이미지 정보 생성 도중 에러가 발생했습니다."
        });
    }

    const userInfo = req.auth.userInfo;

    const upload = multer({
        storage: multer.diskStorage({
            filename(req, file, done) {
                const randomID = uuid4();
                const ext = path.extname(file.originalname);
                const filename = `${randomID}${ext}`;
                done(null, filename);
            },
            destination(req, file, done) {
                done(null, imagePath);
            }
        }),
        // limits: { fileSize : 5 * 1024 * 1024 },
    }).single('pagoth');

    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({
                errorCode: 1,
                msg: "이미지 정보 생성 도중 에러가 발생했습니다."
            });
        }

        //console.log(req.body, req.file)

        const parse = JSON.parse(req.body.data);
        if (parse.tag === '') {
            parse.tag = null
        }
        if (parse.theme_tag === '') {
            parse.theme_tag = null
        }
        if (parse.descript === '') {
            parse.descript = null
        }

        console.log(parse)

        // 이미지 업로드에 필요한 정보가 누락된 경우
        if (!req.file || !req.query.gallery_id || !parse.theme_tag) {
            return res.status(400).json({
                errorCode: 512,
                msg: "이미지 정보 생성 도중 에러가 발생했습니다.",
            });
        }

        const imageURL = `http://${keys.SERVER_HOST}:${keys.SERVER_PORT}/images/${req.file.filename}`
        const imageInfo = {
            user_id: userInfo.id,
            gallery_id: req.query.gallery_id,
            title: path.basename(req.file.originalname, path.extname(req.file.originalname)),
            tag: parse.tag,
            theme_tag: parse.theme_tag,
            descript: parse.descript,
            image_url: imageURL,
        }

        try {
            const image = await Image.create(imageInfo);
            return res.status(200).json({
                msg: "이미지 정보 생성에 성공했습니다.",
            });
    
        } catch (error) {
            if(keys.IS_DEV) {
                console.log(error);
            }
    
            return res.status(500).json({
                errorCode: 1,
                msg: "이미지 정보 생성 도중 에러가 발생했습니다.",
            });
        }
    });

});

module.exports = router;
