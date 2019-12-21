    
var jwt = require('jsonwebtoken');
const config = require("./config");

const  verifyToken = (req, res, next) => {

    let token = req.headers.authorization;
    if (!token) {
        return res.status(500).send({
            auth: false, message: 'No token provided.'
        });
    }
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(500).send({
                auth: false,
                message: 'Fail to Authentication. Error -> ' + err
            });

        } else {
             if (decoded.accessLevel == 1|| decoded.accessLevel == 2) {
                next(decoded);
            } else {
                return res.status(500).send({
                    auth: false,
                    message: 'Fail to Authentication.'
                });
            }
        }
	});

}
module.exports = { verifyToken };