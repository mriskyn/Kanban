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
        const createdAt = new Date();
        const updatedAt = new Date();

        Task.create({
            title, category, createdAt, updatedAt, UserId
        })
            .then(task => {
                res.status(201).json(task );
            })
            .catch(err => {
                res.status(500).json({ message: err.message || 'Internal Server Error' });
            })
    }

    static delete(req, res) {
        const { id } = req.params;
        let taskToClient;
        Task.findOne({ where: { id } })
            .then(task => {
                taskToClient = task;
                return Task.destroy({ where: { id }})
            })
            .then(deletedTask => {
                res.status(200).json(taskToClient)
            })
            .catch(err => {
                res.status(500).json({ message: err.message || 'Internal Server Error' });
            })
    }
    
}

module.exports = TaskController;