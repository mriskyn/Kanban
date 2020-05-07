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
        const createdAt = new Date();
        const updatedAt = new Date();

        Task.create({
            title, category, createdAt, updatedAt
        })
            .then(task => {
                res.status(201).json({ title, category });
            })
            .catch(err => {
                res.status(500).json({ message: err.message || 'Internal Server Error' });
            })
    }

    static delete(req, res) {
        const { id } = req.params;

        Task.destroy({ where: { id } })
            .then(task => {
                res.status(200).json({ message: `delete task with id ${id}` })
            })
            .catch(err => {
                res.status(500).json({ message: err.message || 'Internal Server Error' });
            })
    }
    
}

module.exports = TaskController;