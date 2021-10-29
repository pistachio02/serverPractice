const { Users } = require('../../models');
require('dotenv').config();
const { verify } = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = (req, res) => {    
    const accessToken = req.cookies.accessToken;
    if(!accessToken) {
        return res.status(401).json({ "message": "Invalid accessToken!" })
    }
    const userInfo = verify(accessToken, process.env.ACCESS_SECRET);
    Users
        .findOne({ where: { email: userInfo.email }})
        .then((data) => {
            if(!data) {
                return res.status(401).json({ "message": "Invalid accessToken!" });
            } else {
                const pw = bcrypt.compareSync("kakaoUser", data.dataValues.password);
                if(pw === true) {
                    Users.destroy({ where: { email: data.dataValues.email } })
                    return res
                            .clearCookie('accessToken')
                            .status(205)
                            .json({ message: 'Successfully Logged Out!' });
                } else {
                    return res
                            .clearCookie('accessToken')
                            .status(205)
                            .json({ message: 'Successfully Logged Out!' });
                }
            }
        })
};