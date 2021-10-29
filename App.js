const fs = require('fs');
const https = require('https');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const express = require('express');
const helmet = require('helmet');
// const morgan = require('morgan');
const controller = require('./controller');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors(
  {
    origin: true,
    credentials: true,
  })
  );
  // app.use(morgan());
app.use(cookieParser());

// app.options('/*', (req, res) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//   res.header('Access-Control-Allow-Headers', 
//   'Content-Type, Authorization, Content-Length, X-Requested-With');
//   res.send();
// });
// cors 오류시 필요

// 테스트 위한 헬로월드 요청
app.get('/', (req, res) => {
    res.send("HelloWorld!!");
})

// 테스트 위한 전체 유저정보 요청
app.get('/userinfo', controller.userinfo);

// auth 를 위한 요청
app.get('/auth', controller.auth);

// 아래는 회원가입 요청
app.post('/register', controller.register);

// 아래는 회원탈퇴 요청
app.delete('/unregister', controller.unRegister);

// 아래는 로그인 요청
app.post('/login', controller.login);

// 아래는 로그아웃 요청
app.post('/logout', controller.logout);

// 아래는 카카오 로그인 요청
app.post('/kakaologin', controller.kakaologin);

// 아래는 이미지 요청
app.get('/images', controller.images);

// const port = 4000;
// let server = app.listen(port, () => console.log(`http 서버가 ${port}번에서 작동중입니다.`));
// module.exports = server;

const port = 4000;

let Server;
if (fs.existsSync('./key.pem') && fs.existsSync('./cert.pem')) {
  const privateKey = fs.readFileSync(__dirname + '/key.pem', 'utf8');
  const certificate = fs.readFileSync(__dirname + '/cert.pem', 'utf8');
  const credentials = { key: privateKey, cert: certificate };

  Server = https.createServer(credentials, app);
  Server.listen(port, () => console.log(`https 서버가 ${port}번에서 작동중입니다.`));
} else {
  Server = app.listen(port, () => console.log(`http 서버가 ${port}번에서 작동중입니다.`));
}
module.exports = Server;