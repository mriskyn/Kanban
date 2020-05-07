const { User } = require('../models');

class UserController{

    static login(req, res){
        const { email, password } = req.body;

        User.findOne({
            where: {
                email, password
            }
        })
        .then(user => {
            if(!user){
                throw new Error('Data is Empty!');
            } else {
                res.status(200).json({ message: 'SUCCESS'});
            }
        })
        .catch(err => {
            if(err.message.includes('Empty!')){
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