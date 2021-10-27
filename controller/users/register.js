const { Users } = require('../../models');
require('dotenv').config();
const { sign } = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
    const { email, password, nickname } = req.body; 
    // 리퀘스트 바디로 들어오는 이메일, 비번, 닉네임을 구조분해할당으로 각각 할당해준다.

    if(!email || !password || !nickname) {
        return res.status(422).json({ message: "Insufficient Parameters Supplied!" });
    };
    // 만약 위 3가지중에 하나라도 없다면 입력되어야 하는 항목이 부족하다고 안내해주는 응답 메세지를 리턴해준다.

    const userEmail = await Users.findOne({ where: { email }});
    const userNickname = await Users.findOne({ where: { nickname }});
    // 데이터베이스를 조회해서 입력으로 들어온 유저 이메일과 닉네임으로 등록된 유저 정보가 이미 있는지 확인하기 위해 각각 유저이메일과 유저닉네임으로 할당을 해준다. (만약 같은 이메일이나 닉네임으로 등록된 유저가 있다면 각각의 변수에 그 유저의 정보가 할당될것이고, 없다면 null 값이 되겠지?)

    const hashedPassword = bcrypt.hashSync(password, 10);
    // 입력으로 들어온 유저의 비밀번호를 비크립트를 통해 한번 더 암호화 하여 해시드비번에 할당해준다.

    if(userEmail !== null) {
        return res.status(409).json({ message: "E-mail Already Exists!" });
        // 만약 입력으로 들어온 이메일이 이미 등록된 이메일이라면 응답으로 이미 등록되어있는 이메일이야 라고 알려준다.
    } else if(userNickname !== null) {
        return res.status(409).json({ message: "Nickname Already Exists!" });
        // 만약 입력으로 들어온 닉네임이 이미 등록된 닉네임이라면 응답으로 이미 등록되어있는 닉네임이야 라고 알려준다.
    } else {
        const newUser = await Users.create({
            email: email,
            password: hashedPassword,
            nickname: nickname
        });
        // 이메일이나 닉네임이 가입되어있는 유저 정보에 등록되어있는것이 아니라면 새롭게 회원 가입을 해줘야 한다. 즉 전달된 이메일, 해시된 비번, 닉네임을 새롭게 데이터베이스에 추가해준다.
        const generateAccessToken = (data) => {
            delete data.password;
            return sign(data, process.env.ACCESS_SECRET, { expiresIn: "7d" });
        }
        // generateAccessToken 이라는 JWT 엑세스 토큰을 만들어주는 함수를 미리 만들어놓고(인자로 전달된 데이터 중 비번은 지우고 토큰에 데이터를 담는다.),
        const accessToken = generateAccessToken(newUser.dataValues);
        // 데이터베이스에 새롭게 입력된(회원가입된) 유저정보들을 이용해서 엑세스토큰을 하나 만든다.
        return res
                // .cookie("accessToken", accessToken, {
                //     httpOnly: true,
                //     secure: true,
                //     sameSite: "none",
                // })
                // 아까 만들어준 엑세스토큰을 응답으로 넘겨줄때 쿠키에 담아 같이 보내준다.
                // 하지만 회원가입 이후 바로 로그인 되는것이 아닌 다시 한 번 로그인 하라고 로그인창으로 이동 시킬것이기에 우선은 토큰을 바로 넘겨주진 않게 했다. 그래서 주석 처리를 한것이다.
                .status(201)
                // 상태코드 201 created 를 응답시 전달해주고,
                .json({ 
                    userInfo: newUser.dataValues,
                    message: "Successfully Registered!" 
                })
                // 응답 객체에 새로 등록된(가입된) 유저의 정보들(비번제외)과 성공적으로 가입되었다는 메세지를 함께 넘겨준다.
                // 따로 유저 정보를 넘겨줄 필요는 없으나, 현재 포스트맨으로 테스트를 하고 있는 중이라 좀 더 정확히 기능 구현이 잘 되는지 확인하기 위해 응답에 유저정보를 담아줬다.
                // 나중엔 유저정보 제외한 응답 메세지만 넘겨줄 예정이다.
    }
};