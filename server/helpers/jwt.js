const jwt = require('jsonwebtoken');
const secretKey = 'h8'

const generateToken = (user) => {
    return jwt.sign({
        id: user.id , email: user.email
    }, secretKey);
}

const verifyToken = token => {
    return jwt.verify(token, secretKey)
}

module.exports = { generateToken, verifyToken };