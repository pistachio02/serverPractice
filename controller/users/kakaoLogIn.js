const { Users } = require('../../models');
require('dotenv').config();
const { sign } = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const axios = require('axios');
const clientID = process.env.KAKAO_CLIENT_ID;

module.exports = (req, res) => {

    const authCode = req.body.authorizationCode;

    const formUrlEncoded = x =>
    Object.keys(x).reduce((p, c) => p + `&${c}=${encodeURIComponent(x[c])}`, '')

    axios
      .post(
        'https://kauth.kakao.com/oauth/token',
        formUrlEncoded({
          grant_type: 'authorization_code',
          client_id: clientID,
          redirect_uri: 'http://localhost:3000/',
          code: authCode
        }),
        {
          headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      )
      .then((response) => {
        const kakaoAccessToken = response.data.access_token;

        axios.get(
          'https://kapi.kakao.com/v2/user/me', 
          {
            headers: { 
              Authorization: `Bearer ${kakaoAccessToken}`
            }
          },
          { withCredentials: true })
          .then(async (data) => {
            const nickname = data.data.properties.nickname;
            const email = data.data.kakao_account.email;
            const password = "kakaoUser"
            const hashedPassword = bcrypt.hashSync(password, 10);

            const userEmail = await Users.findOne({ where: { email }});
            const userNickname = await Users.findOne({ where: { nickname }});
            
            if(userEmail !== null) {
                return res.status(409).json({ message: "E-mail Already Exists!" });
            } else if(userNickname !== null) {
                return res.status(409).json({ message: "Nickname Already Exists!" });
            } else {
                const newUser = await Users.create({
                    email: email,
                    password: hashedPassword,
                    nickname: nickname
                });
                const generateAccessToken = (data) => {
                    delete data.password;
                    return sign(data, process.env.ACCESS_SECRET, { expiresIn: "1d" });
                }
                const accessToken = generateAccessToken(newUser.dataValues);
                return res
                        .cookie("accessToken", accessToken, {
                            httpOnly: true,
                            secure: true,
                            sameSite: "none",
                            expiresIn: "1d"
                        })
                        .status(200)
                        .json({ 
                            userInfo: newUser.dataValues,
                            message: 'Successfully Logged In!' 
                        });
            }
          })
      })
      .catch((err) => {
        console.log(err)
      })
};