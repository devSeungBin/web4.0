if (process.env.NODE_ENV == 'production') {
    console.log('[Config] 현재 배포모드 입니다.');
    module.exports = require('./prod');
    
} else if (process.env.NODE_ENV == 'development') {
    console.log('[Config] 현재 개발모드 입니다.');
    module.exports = require('./dev');

}