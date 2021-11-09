const { Posts } = require('../../models');

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
    const totalCount = await Posts.findAll().then((data) => { return data.length }).catch((err) => {console.log(err)});

    Posts
        .findAll({ offset: offset, limit: pageSize, order: [['id', 'DESC']] })
        .then((data) => {
            const totalPage = getTotalPage(totalCount, pageSize);

            res.json({
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