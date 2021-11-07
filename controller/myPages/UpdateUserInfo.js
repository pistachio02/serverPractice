const { Users } = require('../../models');
const { verify } = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = (req, res) => {
    // console.log(req.body)

    const newNickname = req.body.userForm.nickname;
    const newPassword = req.body.userForm.password;
    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    // console.log(hashedPassword);

    const isAuthorized = (req) => {
        const authorization = req.cookies.accessToken;
        if(!authorization) {
          return null;
        }
        const userInfo = authorization
        try {
          return verify(userInfo, process.env.ACCESS_SECRET);
        } catch (err) {
          return null;
        }
    }

    const accessTokenData = isAuthorized(req);
    
    if(!accessTokenData) {
        res.status(401).send({ data: null, message: 'Not Authorized!' });
    } else {
        Users
            .findOne({ where: { id: accessTokenData.id } })
            .then((data) => {
                // console.log(data.dataValues)
                Users
                    .update({ nickname: newNickname}, { where: { id: accessTokenData.id } })
                    .then(() => {
                        Users.update({ password: hashedPassword }, { where: { id: accessTokenData.id } })
                        .then(() => {
                            return res.status(200).json({ message: 'Nickname and Password Successfully Updated!' })
                        })
                    })

        })
        .catch((err) => {
            console.log(err);
        });
    }
};
