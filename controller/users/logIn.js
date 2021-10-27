const { Users } = require('../../models');
require('dotenv').config();
const { sign } = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = (req, res) => {
    const { email, password } = req.body;
    // 리퀘스트 바디로 들어오는 이메일, 비번을 구조분해할당으로 각각 할당해준다.

    Users
        .findOne({ where: { email } })
        // 입력된 이메일로 데이터베이스를 조회해서 등록된 유저(이메일)가 맞는지 확인 후,
        .then((data) => {

            if(!data) {
                return res.status(404).json({ message: 'Invalid E-mail!' });
                // 등록된 이메일(유저)이 아닌 경우, 유효하지 않은 이메일이야 라고 응답으로 안내해준다.
            }
            const hashedPassword = bcrypt.compareSync(password, data.dataValues.password);
            // 만약 등록된 이메일(유저)인 경우 비크립트로 해시된 해당 유저의 비밀번호를 데이터베이스에서 가져와 유저가 로그인 시 입력한 비밀번호와 같은지 확인해보고,
            if(!hashedPassword) {
                return res.status(404).json({ message: 'Invalid Password!' });
                // 만약 입력된 비번과 데이터베이스에 있는 해시된 비번이 일치하지 않는 경우, 유효하지 않은 비번이야 라고 응답으로 안내해준다.
            }
            const generateAccessToken = (userInfo) => {
                delete userInfo.password;
                return sign(userInfo, process.env.ACCESS_SECRET, { expiresIn: "7d" });
            }
            // 만약 이메일도 등록되어 있고, 비번도 일치한다면,
            // generateAccessToken 이라는 JWT 엑세스 토큰을 만들어주는 함수를 미리 만들어놓고(인자로 전달된 데이터 중 비번은 지우고 토큰에 데이터를 담는다.),
            const accessToken = generateAccessToken(data.dataValues);
            // 데이터베이스에 입력되어있던 해당 유저정보들을 이용해서 엑세스토큰을 하나 만든다.
            res
                .cookie("accessToken", accessToken, {
                    httpOnly: true,
                    // secure: true,
                    sameSite: "none",
                })
                // 응답으로 쿠키에 해당 유저의 정보(비번제외)를 담은 엑세스토큰을 담아 보내주고,
                // secure 옵션을 주석처리한것은 우선 지금은 https가 아닌 http 서버로 기능 구현 테스트를 하고 있기 때문이다.
                // 나중에 https 서버로 하게 된다면 secure 옵션도 추가해줘야 한다.
                .status(200)
                // 상태코드 200 ok 를 응답시 전달해주고,
                .json({ 
                    userInfo: data.dataValues,
                    message: 'Successfully Logged In!' 
                });
                // 응답 객체에 해당 유저의 정보들(비번제외)과 성공적으로 로그인 되었다는 메세지를 함께 넘겨준다.
                // 따로 유저 정보를 넘겨줄 필요는 없으나, 현재 포스트맨으로 테스트를 하고 있는 중이라 좀 더 정확히 기능 구현이 잘 되는지 확인하기 위해 응답에 유저정보를 담아줬다.
                // 나중엔 유저정보 제외한 응답 메세지만 넘겨줄 예정이다.
        })
        .catch((err) => {
            console.log(err);
        });
        // 에러처리
};