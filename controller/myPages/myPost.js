const { Posts } = require('../../models');
const { verify } = require('jsonwebtoken');

const getTotalPage = (totalCount, pageSize) => {
    const totalPage = Math.floor(totalCount / pageSize)
    if (totalCount % pageSize > 0) {
        return totalPage + 1
    }
    return totalPage
}

module.exports = async (req, res) => {

    const pageSize = 6;
    const page = parseInt(req.query.page);
    const offset = (page -1) * pageSize
    
    const isAuthorized = (req) => {
        const authorization = req.cookies.accessToken;
        if(!authorization) {
          return null;
        };
        const userInfo = authorization;
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
        const totalCount = await Posts.findAll({ where: { user_nickname: accessTokenData.nickname } }).then((data) => { return data.length })

        Posts
            .findAll({ where: { user_nickname: accessTokenData.nickname }, offset: offset, limit: pageSize })
            .then((data) => {
                const totalPage = getTotalPage(totalCount, pageSize);

                return res.json({
                            info: {
                                currentPage: page,
                                totalPage: totalPage,
                                totalCount: totalCount
                            },
                            list: data
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }
}