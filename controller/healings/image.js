const { Images } = require('../../models');
const { Users } = require('../../models');
require('dotenv').config();
const { verify } = require('jsonwebtoken');

module.exports = (req, res) => {
    const accessToken = req.cookies.accessToken

    if(!accessToken) {
        Images
            .findAll()
            .then((data) => {
                const imageList = [
                    data[0].image,
                    data[1].image,
                    data[2].image,
                    data[3].image,
                    data[4].image,
                ]
                res.json(imageList)
            })
    } else {
        const userInfo = verify(accessToken, process.env.ACCESS_SECRET);
        Users
            .findOne({ where: { email: userInfo.email }})
            .then((data) => {
                if(!data) {
                    return res.status(401).json({ "message": "Invalid accessToken!" })
                } else {
                    Images
                        .findAll()
                        .then((data) => {
                            const imageList = [
                                data[0].image,
                                data[1].image,
                                data[2].image,
                                data[3].image,
                                data[4].image,
                                data[5].image,
                                data[6].image,
                                data[7].image,
                                data[8].image,
                                data[9].image,
                                data[10].image,
                            ]
                            res.json(imageList)
            })
                }
            })
    }
};