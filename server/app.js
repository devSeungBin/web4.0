// 서버 설정
const keys = require('./config/key');

const express = require('express');
const app = express();
const port = keys.SERVER_PORT;                      

app.use(express.urlencoded({extended:true}));   //application/x-www-form-urlencoded (x-www-form-urlencoded 형태의 요청 body를 파싱)
app.use(express.json());                        //application/json (JSON 형태의 요청 body를 파싱)

const path = require('path');
const publicPath = path.join(__dirname, 'public');
const imagePath = path.join(__dirname, 'public/images');
const profilePath = path.join(__dirname, 'public/profiles');
const thumbnailPath = path.join(__dirname, 'public/thumbnails');
app.use("/images", express.static(imagePath));
app.use("/profiles", express.static(profilePath));
app.use("/thumbnails", express.static(thumbnailPath));

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const cors = require('cors');
const client = `http://${keys.CLIENT_HOST}:${keys.CLIENT_PORT}`;
app.use(cors({
    origin: client,
    methods: ['GET', 'POST', 'OPTIONS'],
    credentials: true,
}));


// 라우팅 설정
const userRouter = require('./controllers/UserController');
const authRouter = require('./controllers/AuthController');
const galleryRouter = require('./controllers/GalleryController');
const galleryUserRouter = require('./controllers/GalleryUserController');
const imageRouter = require('./controllers/ImageController');

app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/galleries', galleryRouter);
app.use('/galleries/users', galleryUserRouter);
app.use('/images', imageRouter);


// 서버 오픈
app.listen(port, () => {
    console.log(`[Server] 서버를 정상적으로 열었습니다. (http://${keys.SERVER_HOST}:${keys.SERVER_PORT})`);
});