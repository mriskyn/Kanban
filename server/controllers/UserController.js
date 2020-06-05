const { User } = require('../models');
const { generateToken } = require('../helpers/jwt');
const { verifyPassword } = require('../helpers/bcrypt');

class UserController{

    static login(req, res){
        console.log(req.body)
        const { email, password } = req.body;

        User.findOne({
            where: { email }
        })
        .then(user => {
            if(!user || !verifyPassword(password, user.password)){
                throw {
                    status: 404, message: 'Wrong email / password!'
                };
            } 
            return user;
        })
        .then(user => {
            const access_token = generateToken(user);
            res.status(200).json({ access_token });
        })
        .catch(err => {
            console.log(err);
            if(err.status){
                res.status(err.status).json({message: err.message})
            } else {
                res.status(500).json({ message: err.message || 'Internal Server Error'});
            }
        })
    }

    static register(req, res){
        console.log(req.body)
        const { first_name, last_name, email, password } = req.body;

        User.create({
            first_name, last_name, email, password
        })
        .then(user => {
            res.status(201).json({
                email: user.email,
                firs_name: user.first_name,
                last_name: user.last_name
            })
        })
        .catch(err => {
            if(err.name === 'SequelizeValidationError'){
                res.status(400).json({
                    message: err.message.split(',\n').join(' ')
                })
            } else {
                res.status(500).json({ message: err.message || 'Internal Server Error'});
            }
        })
    }
}

module.exports = UserController;