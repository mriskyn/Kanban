const { Task } = require('../models');

class TaskController {

    static read(req, res) {
        Task.findAll()
            .then(tasks => {
                res.status(200).json(tasks);
            })
            .catch(err => {
                res.status(500).json({ message: err.message || 'Internal Server Error' });
            })
    }

    static create(req, res) {
        const { title, category } = req.body;
        const UserId = req.user.id;

        Task.create({
            title, category, UserId
        })
            .then(task => {
                res.status(201).json(task);
            })
            .catch(err => {
                if(err.name === 'SequelizeValidationError'){
                    res.status(400).json({message: err.message.split(',\n').join(' ')})
                } else {
                    res.status(500).json({ message: err.message || 'Internal Server Error' });
                }
            })
    }

    static update(req, res){

    }

    static delete(req, res) {
        const { id } = req.params;

        Task.destroy({ where: {id }})
        .then(() => {
            return Task.findByPk(id)
        })
        .then(task => res.status(200).json(task))
        .catch(err => {
            res.status(500).json({ message: err.message || 'Internal Server Error' });
        })
    }
    
}

module.exports = TaskController;