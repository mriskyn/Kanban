const router = require('express').Router();
const UserController = require('../controllers/UserController');
const TaskController = require('../controllers/TaskController');

router.post('/login', UserController.login);
router.get('/tasks', TaskController.read);
router.post('/tasks', TaskController.create);
router.delete('/tasks/:id', TaskController.delete);

module.exports = router;