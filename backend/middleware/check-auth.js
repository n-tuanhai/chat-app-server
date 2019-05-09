const jwt = require('jsonwebtoken');
const secretkey = 'u4AOqGP4pgSP2z1hsG6ZCkrkEIE7ayEsf9nbbFQlBbTCNXWJmn5NE1CUauxQgYD';

exports.verifyToken = function (req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, secretkey);
        req.userData = decoded;
    } catch(error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
    next();
}