const { Posts } = require('../../models');

const getTotalPage = (totalCount, pageSize) => {
    const totalPage = Math.floor(totalCount / pageSize)
    if (totalCount % pageSize > 0) {
        return totalPage + 1
    }
    return totalPage
}

module.exports = (req, res) => {

    const page = parseInt(req.query.page);


    Posts
        .findAll()
        .then((data) => {
            const pageSize = 10;
            const totalCount = data.length;
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
}