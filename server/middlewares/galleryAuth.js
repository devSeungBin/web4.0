const keys = require('../config/dev');

const db = require('../models/DB');
const { Gallery, GalleryUser } = db;

const galleryAuth = async (req, res, next) => {

    req.galleryAuth = {};

    const userInfo = req.auth.userInfo;
    const gallery_id = req.query.gallery_id;

    try {
        // 갤러리 내부 요청(이미지 업로드 등)이 들어왔을때, 요청한 갤러리가 존재하는지 확인
        const gallery = await Gallery.findOne({ where: { id: gallery_id }, raw: true })
        if (!gallery) {
            req.galleryAuth.galleryExist = false;
        } else {
            req.galleryAuth.galleryExist = true;
        }

        // 요청한 갤러리가 존재하면, 요청한 사용자가 해당 갤러리의 참가자가 맞는지 확인
        const galleryUser = await GalleryUser.findOne({ where: { user_id: userInfo.id, gallery_id: gallery_id }, raw: true })
        if (!galleryUser) {
            req.galleryAuth.isMember = false;
        } else {
            req.galleryAuth.isMember = true;
        }

    } catch (error) {
        if(keys.IS_DEV) {
            console.log(error);
        }

        req.galleryAuth.error = result.error;
    }

    // 결과 확인용
    // if(keys.IS_DEV) {
    //     console.log(req.galleryAuth);
    // }
    
    next();
}

module.exports = galleryAuth;
