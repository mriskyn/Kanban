const { User } = require('../models');
const bcrypt = require('bcrypt');
const generateToken = require('../helpers/jwt');

class UserController{

    static login(req, res){
        console.log(req.body)
        const { email, password } = req.body;

        User.findOne({
            where: { email }
        })
        .then(user => {
            if(!user || !bcrypt.compareSync(password, user.password)){
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
            if(err.message){
                res.status(404).json({message: err.message})
            } else {
                res.status(500).json({ message: err.message || 'Internal Server Error'});
            }
        })
    }

    static register(req, res){
        const { first_name, last_name, email, password } = req.body;

        User.create({
            first_name, last_name, email, password
        })
        .then(user => {
            res.status(201).json(user)
        })
        .catch(err => {
            res.status(500).json({ message: err.message || 'Internal Server Error'});
        })
    }
}

module.exports = UserController;