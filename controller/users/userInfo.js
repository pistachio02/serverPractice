const { Users } = require('../../models');

module.exports = (req, res) => {
    const id = req.query.id;

    Users
        .findOne({ where: { id } })
        .then((data) => {
            if(!data) {
                res.status(404).json({ message: 'Invalid User!' });
            }
            const userInfo = data;
            res.json({ userinfo: userInfo })
        })
        .catch((err) => {
            console.log(err);
          });
};
