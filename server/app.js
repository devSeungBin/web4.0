// 서버 설정
const keys = require('./config/key');

const express = require('express');
const app = express();
const port = keys.SERVER_PORT;                      

app.use(express.urlencoded({extended:true}));   //application/x-www-form-urlencoded (x-www-form-urlencoded 형태의 요청 body를 파싱)
app.use(express.json());                        //application/json (JSON 형태의 요청 body를 파싱)

const path = require('path');
const imagePath = path.join(__dirname, 'public/image');
const profilePath = path.join(__dirname, 'public/profiles');
const thumbnailPath = path.join(__dirname, 'public/thumbnails');
app.use("/image", express.static(imagePath));
app.use("/profiles", express.static(profilePath));
app.use("/thumbnails", express.static(thumbnailPath));

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const cors = require('cors');
const client = `http://${keys.CLIENT_HOST}:${keys.CLIENT_PORT}`;
const corsOption = {
    origin: client,
    methods: ['GET', 'POST', 'OPTIONS', 'HEAD'],
    credentials: true,
}
app.use(cors(corsOption));


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

app.options('*', cors(corsOption)); // 모든 경로에 대한 OPTIONS 요청 허용


// 서버 오픈
app.listen(port, () => {
    console.log(`[Server] 서버를 정상적으로 열었습니다. (http://${keys.SERVER_HOST}:${keys.SERVER_PORT})`);
});