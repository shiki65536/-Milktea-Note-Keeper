const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
    //Get token from header
    const token = req.header('x-auth-token');

    //check if no token
    if (!token) {
        return res.status(401).json({ msg: 'no token, authorization denied' });
    } else{
        try {
            const decoded = jwt.verify(token, config.get('jwtSecret'));
            req.user = decoded.user;
            next()
        } catch (err) {
            return res.status(401).json({ msg: 'token is not valid' });
        }
    }
    
}