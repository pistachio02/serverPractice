const { Users } = require('../../models');
require('dotenv').config();
const { sign } = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
    const { email, password, nickname } = req.body; 

    if(!email || !password || !nickname) {
        return res.status(422).json({ message: "Insufficient Parameters Supplied!" });
    };

    const userEmail = await Users.findOne({ where: { email }});
    const userNickname = await Users.findOne({ where: { nickname }});

    const hashedPassword = bcrypt.hashSync(password, 10);

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
                .status(201)
                .json({ 
                    userInfo: newUser.dataValues,
                    message: "Successfully Registered!" 
                })
    }
};