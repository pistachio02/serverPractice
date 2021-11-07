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


// auth 를 위한 요청
app.get('/auth', controller.auth);

// 아래는 회원가입 요청
app.post('/register', controller.register);

// 아래는 로그인 요청
app.post('/login', controller.login);

// 아래는 로그아웃 요청
app.post('/logout', controller.logout);

// 아래는 카카오 & 구글 로그인 요청
app.post('/oauthlogin', controller.kakaogooglelogin);

// ( ++++++++++++++++++++ 띄어놓기 띄어놓기 띄어놓기 ++++++++++++++++++++ )

// 아래는 힐링페이지 관련 요청
app.get('/healing', controller.healing)

// ( ++++++++++++++++++++ 띄어놓기 띄어놓기 띄어놓기 ++++++++++++++++++++ )

// 아래는 전체 게시글 보기 목록 요청
app.get('/list', controller.posts);

// 아래는 게시글 1개 보기 요청
app.get('/board/view/:id', controller.post);

// 아래는 게시글에 대한 댓글 목록 요청
app.get('/view/:id/comments', controller.comments);

// 아래는 댓글 달기 요청
app.post('/board/write/comment', controller.addComment);

// 아래는 댓글 삭제 요청
app.post('/board/delete/comment', controller.deleteComment);

// 아래는 게시글 등록 및 수정 요청
app.post('/board/write', controller.addPost);

// 아래는 게시글 삭제 요청
app.post('/board/delete', controller.deletePost);

// ( ++++++++++++++++++++ 띄어놓기 띄어놓기 띄어놓기 ++++++++++++++++++++ )

// 아래는 유저정보 수정 요청
app.post('/edit', controller.updateUserInfo);

// 아래는 회원탈퇴 요청
app.delete('/unregister', controller.unRegister);

// 아래는 찜 목록 불러오기 요청
app.get('/zzim', controller.zzim);

// 아래는 찜 등록 요청
app.post('/zzim', controller.addZzim);

// 아래는 찜 삭제하기 요청
app.post('/delzzim', controller.deleteZzim);

// 아래는 내 게시글 목록 불러오기 요청
app.get('/myposts', controller.myPosts);



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