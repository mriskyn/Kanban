const { verifyToken } = require('../helpers/jwt');

module.exports = (req, res, next) => {
    const { access_token } = req.headers;
    
    if(!access_token){
        res.status(404).json({ message: 'Invalid token!'});
    } else {
        try{
            const decoded = verifyToken(access_token);
            req.user = decoded;
            next();
        }
        catch(err){
            res.status(401).json({ message: err.message || 'User not Authenticate!'})
        }
    }
};