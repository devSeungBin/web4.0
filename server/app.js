const express = require('express');
const ejs = require('ejs');

const userRouter = require('./routes/user-routes');
// const bodyParser = require('body-parser')

const app = express();
const port = 3000;

// 템플릿 엔진으로 ejs를 사용
app.set('view engine', 'ejs');

// view 파일들은 server/views에 생성
app.set('views', './views');

app.use('/api', userRouter);

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})
  