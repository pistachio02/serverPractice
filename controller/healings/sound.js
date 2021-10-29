const { Sounds } = require('../../models');
const { Users } = require('../../models');
require('dotenv').config();
const { verify } = require('jsonwebtoken');

module.exports = (req, res) => {
    const accessToken = req.cookies.accessToken
    // console.log(accessToken)

    if(!accessToken) {
        Sounds
            .findAll()
            .then((data) => {
                const soundList = [
                    data[0].sound,
                    data[1].sound,
                    data[2].sound,
                    data[3].sound,
                    data[4].sound,
                ]
                res.json(soundList)
            })
    } else {
        const userInfo = verify(accessToken, process.env.ACCESS_SECRET);
        Users
            .findOne({ where: { email: userInfo.email }})
            .then((data) => {
                if(!data) {
                    return res.status(401).json({ "message": "Invalid accessToken!" })
                } else {
                    Sounds
                        .findAll()
                        .then((data) => {
                            const soundList = [
                                data[0].sound,
                                data[1].sound,
                                data[2].sound,
                                data[3].sound,
                                data[4].sound,
                                data[5].sound,
                                data[6].sound,
                                data[7].sound,
                                data[8].sound,
                                data[9].sound,
                                data[10].sound,
                            ]
                            res.json(soundList)
                        })
                }
            })
    }
};