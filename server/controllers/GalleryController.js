const keys = require('../config/dev');

const express = require("express");
const router = express.Router();

const multer = require('multer');
const uuid4 = require('uuid4');
const path = require('path');

const thumbnailPath = path.join(__dirname, '../public', 'thumbnails');

const db = require('../models/DB');
const { Gallery, GalleryUser } = db;


// 미들웨어
const auth = require('../middlewares/auth');
router.use(['/'], auth);


// 전체 갤러리 정보 조회
router.get('/', async (req, res) => {
    if(keys.IS_DEV) {
        console.log('[Server] GET 요청 도착 (uri: /galleries)');
    }

    const userInfo = req.auth.userInfo;
    
    try {
        const galleryUser = await GalleryUser.findAll({ where: { user_id: userInfo.id }, raw: true })
        if (galleryUser.length === 0) {
            return res.status(400).json({
                errorCode: 300, 
                msg: "전체 갤러리 정보 조회 도중 에러가 발생했습니다.",
            });
        }

        let galleryList = new Array();
        let loopCount = 0;
        galleryUser.forEach( async (gallery) => {
            const listItem = await Gallery.findOne({ where: { id: gallery.gallery_id }, raw: true });
            galleryList.push(listItem);
            loopCount = loopCount + 1;

            if (loopCount === galleryUser.length) {
                return res.status(200).json({
                    msg: "전체 갤러리 정보 조회에 성공했습니다.",
                    galleries: galleryList,
                });
            }
        });

    } catch (error) {
        if(keys.IS_DEV) {
            console.log(error);
        }

        return res.status(500).json({
            errorCode: 1,
            msg: "전체 갤러리 정보 조회 도중 에러가 발생했습니다.",
        });
    }
});

// 갤러리 정보 생성
router.post('/', async (req, res) => {
    if(keys.IS_DEV) {
        console.log('[Server] POST 요청 도착 (uri: /galleries)');
    }

    const userInfo = req.auth.userInfo;
    
    if (Object.keys(req.body).length !== 0) {
        const parse = req.body;
        if (parse.title === '') {
            parse.title = null
        }
        if (parse.theme === '') {
            parse.theme = null
        }

        // 갤러리 정보 생성에 필요한 정보가 누락된 경우
        if (!parse.title || !parse.theme) {
            return res.status(400).json({
                errorCode: 310,
                msg: "갤러리 정보 생성 도중 에러가 발생했습니다.",
            });
        }

        // 갤러리 이름과 동일한 갤러리 이름을 가지는 갤러리가 이미 DB에 존재하는 경우
        if (await Gallery.findOne({ where: { title: parse.title } })) {
            return res.status(400).json({
                errorCode: 311, 
                msg: "갤러리 정보 생성 도중 에러가 발생했습니다.",
            });
        }

        let imageURL = `http://${keys.SERVER_HOST}:${keys.SERVER_PORT}/thumbnails/defaultThumbnail.svg`
        
        const galleryInfo = {
            title: parse.title,
            theme: parse.theme,
            thumbnail: imageURL,
            descript: parse.descript,
            admin_id: userInfo.id,
        }

        try {           
            const gallery = await Gallery.create(galleryInfo);

            const galleryUser = {
                user_id: userInfo.id,
                gallery_id: gallery.dataValues.id,
            }
            await GalleryUser.create(galleryUser);

            return res.status(200).json({
                msg: "갤리러 정보 생성에 성공했습니다.",
                gallery: {
                    id: gallery.id,
                    title: gallery.title,
                    theme: gallery.theme,
                    thumbnail: gallery.thumbnail,
                    descript: gallery.descript
                },
            });
    
        } catch (error) {
            if(keys.IS_DEV) {
                console.log(error);
            }
    
            return res.status(500).json({
                errorCode: 1,
                msg: "이미지 정보 생성 도중 에러가 발생했습니다."
            });
        }
    } else {
        const upload = multer({
            storage: multer.diskStorage({
                filename(req, file, done) {
                    const randomID = uuid4();
                    const ext = path.extname(file.originalname);
                    const filename = `${randomID}${ext}`;
                    done(null, filename);
                },
                destination(req, file, done) {
                    done(null, thumbnailPath);
                }
            }),
            // limits: { fileSize : 1024*1024 },
        }).single('pagoth');
    
        upload(req, res, async (err) => {
            if (err) {
    
                return res.status(500).json({
                    errorCode: 1,
                    msg: "갤러리 정보 생성 도중 에러가 발생했습니다.",
                });
            }
    
            const parse = JSON.parse(req.body.data);
            if (parse.title === '') {
                parse.title = null
            }
            if (parse.theme === '') {
                parse.theme = null
            }
    
            // 갤러리 정보 생성에 필요한 정보가 누락된 경우
            if (!parse.title || !parse.theme) {
                return res.status(400).json({
                    errorCode: 310,
                    msg: "갤러리 정보 생성 도중 에러가 발생했습니다.",
                });
            }
    
            // 갤러리 이름과 동일한 갤러리 이름을 가지는 갤러리가 이미 DB에 존재하는 경우
            if (await Gallery.findOne({ where: { title: parse.title } })) {
                return res.status(400).json({
                    errorCode: 311, 
                    msg: "갤러리 정보 생성 도중 에러가 발생했습니다.",
                });
            }
    
            let imageURL = `http://${keys.SERVER_HOST}:${keys.SERVER_PORT}/thumbnails/${req.file.filename}` 
            
            const galleryInfo = {
                title: parse.title,
                theme: parse.theme,
                thumbnail: imageURL,
                descript: parse.descript,
                admin_id: userInfo.id,
            }
    
            try {           
                const gallery = await Gallery.create(galleryInfo);
    
                const galleryUser = {
                    user_id: userInfo.id,
                    gallery_id: gallery.dataValues.id,
                }
                await GalleryUser.create(galleryUser);
    
                return res.status(200).json({
                    msg: "갤리러 정보 생성에 성공했습니다.",
                    gallery: {
                        id: gallery.id,
                        title: gallery.title,
                        theme: gallery.theme,
                        thumbnail: gallery.thumbnail,
                        descript: gallery.descript
                    },
                });
        
            } catch (error) {
                if(keys.IS_DEV) {
                    console.log(error);
                }
        
                return res.status(500).json({
                    errorCode: 1,
                    msg: "이미지 정보 생성 도중 에러가 발생했습니다."
                });
            }
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
    //             done(null, thumbnailPath);
    //         }
    //     }),
    //     // limits: { fileSize : 1024*1024 },
    // }).single('pagoth');

    // upload(req, res, async (err) => {
    //     if (err) {

    //         return res.status(500).json({
    //             errorCode: 1,
    //             msg: "갤러리 정보 생성 도중 에러가 발생했습니다.",
    //         });
    //     }

    //     const parse = JSON.parse(req.body.data);
    //     if (parse.title === '') {
    //         parse.title = null
    //     }
    //     if (parse.theme === '') {
    //         parse.theme = null
    //     }

    //     // 갤러리 정보 생성에 필요한 정보가 누락된 경우
    //     if (!parse.title || !parse.theme) {
    //         return res.status(400).json({
    //             errorCode: 310,
    //             msg: "갤러리 정보 생성 도중 에러가 발생했습니다.",
    //         });
    //     }

    //     // 갤러리 이름과 동일한 갤러리 이름을 가지는 갤러리가 이미 DB에 존재하는 경우
    //     if (await Gallery.findOne({ where: { title: parse.title } })) {
    //         return res.status(400).json({
    //             errorCode: 311, 
    //             msg: "갤러리 정보 생성 도중 에러가 발생했습니다.",
    //         });
    //     }

    //     console.log(req.file, parse)
    //     let imageURL = `http://${keys.SERVER_HOST}:${keys.SERVER_PORT}/thumbnails/defaultThumbnail.svg`
    //     if (req.file) {
    //         imageURL = `http://${keys.SERVER_HOST}:${keys.SERVER_PORT}/thumbnails/${req.file.filename}`
    //     } 
        
    //     const galleryInfo = {
    //         title: parse.title,
    //         theme: parse.theme,
    //         thumbnail: imageURL,
    //         descript: parse.descript,
    //         admin_id: userInfo.id,
    //     }

    //     try {           
    //         const gallery = await Gallery.create(galleryInfo);

    //         const galleryUser = {
    //             user_id: userInfo.id,
    //             gallery_id: gallery.dataValues.id,
    //         }
    //         await GalleryUser.create(galleryUser);

    //         return res.status(200).json({
    //             msg: "갤리러 정보 생성에 성공했습니다.",
    //             gallery: {
    //                 id: gallery.id,
    //                 title: gallery.title,
    //                 theme: gallery.theme,
    //                 thumbnail: gallery.thumbnail,
    //                 descript: gallery.descript
    //             },
    //         });
    
    //     } catch (error) {
    //         if(keys.IS_DEV) {
    //             console.log(error);
    //         }
    
    //         return res.status(500).json({
    //             errorCode: 1,
    //             msg: "이미지 정보 생성 도중 에러가 발생했습니다."
    //         });
    //     }
    // });

});


module.exports = router;
