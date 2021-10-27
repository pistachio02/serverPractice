const { Users } = require('../../models');
require('dotenv').config();
const { verify } = require('jsonwebtoken');

module.exports = (req, res) => {
    const accessToken = req.cookies.accessToken;
    // 요청의 쿠키에 있는 엑세스토큰을 따로 변수에 할당해준다.
    if(!accessToken) {
        return res.status(401).json({ "message": "Invalid accessToken!" })
        // 쿠키에 엑세스토큰이 없다면 유효하지 않은 토큰이야 라고 응답으로 안내해준다.
    }
    const userInfo = verify(accessToken, process.env.ACCESS_SECRET);
    // 쿠키에 엑세스토큰이 있다면 엑세스시크릿으로 베리파이 해서 유저인포라는 변수에 토큰에 담겨있던 유저 정보를 담아주고,
    Users
        .findOne({ where: { email: userInfo.email }})
        // 해당 유저의 정보 중 이메일을 이용해서 데이터베이스를 조회해 등록된 이메일(유저)인지 먼저 확인 후
        .then((data) => {
            if(!data) {
                return res.status(401).json({ "message": "Invalid accessToken!" });
                // 만약 등록된 이메일(유저)이 아닌 경우, 유효하지 않은 토큰이야 라고 응답으로 안내해준다.
            }
            Users.destroy({ where: { email: userInfo.email } })
            // 만약 등록된 이메일(유저)인 경우, 해당 유저의 정보를 데이터베이스에서 삭제하고,
            return res
                    .clearCookie('accessToken')
                    .status(205)
                    .json({ message: 'Successfully Unregistered!' });
            // 응답으로 쿠키를 삭제해주고, 상태코드 205 reset content 를 응답에 담아 보내주고, 응답 객체의 메세지에 회원탈퇴 잘 됐다 라고 안내해준다.
        })
};