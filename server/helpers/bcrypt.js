const bcrypt = require('bcrypt');

const hashPassword = password => {
    return bcrypt.hashSync(password, Math.floor(Math.random() * 10))
}

const verifyPassword = (clientPassword, userPassword) => {
    return bcrypt.compareSync(clientPassword, userPassword);
}

module.exports = { hashPassword, verifyPassword }