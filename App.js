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
app.use(
  cors({
    origin: ["https://localhost:3000"],
    credentials: true
  })
  );
  // app.use(morgan());
app.use(cookieParser());


// 테스트 위한 헬로월드 요청
app.get('/', (req, res) => {
    res.send("HelloWorld!!");
})

// 테스트 위한 전체 유저정보 요청
app.get('/userinfo', controller.userinfo);

// 아래는 회원가입 요청
app.post('/register', controller.register);

// 아래는 회원탈퇴 요청
app.delete('/unregister', controller.unRegister);

// 아래는 로그인 요청
app.post('/login', controller.login);

// 아래는 로그아웃 요청
app.post('/logout', controller.logout);



app.listen(3000);

// const port = 4000;

// let Server;
// if (fs.existsSync('./key.pem') && fs.existsSync('./cert.pem')) {
//   const privateKey = fs.readFileSync(__dirname + '/key.pem', 'utf8');
//   const certificate = fs.readFileSync(__dirname + '/cert.pem', 'utf8');
//   const credentials = { key: privateKey, cert: certificate };

//   Server = https.createServer(credentials, app);
//   Server.listen(port, () => console.log(`https 서버가 ${port}번에서 작동중입니다.`));
// } else {
//   Server = app.listen(port, () => console.log(`http 서버가 ${port}번에서 작동중입니다.`));
// }
// module.exports = Server;

// 위 주석처리 한 부분은 https 서버 구현 위한 코드이다.
// 현재 아직 코드 작성하는 단계이기때문에 원활한 테스트를 위해 우선은 http 서버로 구현해서 테스트 해 볼 예정이다.
// https 로 하게 되면 팀원들과 서버 작성한 부분 공유 시 늘 cert.pem, key.pem 을 설치해서 테스트 해봐야 하기 때문에 번거롭다.
// 해서 우선 기능 구현 테스트를 진행할때까지만이라도 http 서버로 진행 예정이다.
