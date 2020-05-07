const router = require('express').Router();
const TaskController = require('../controllers/TaskController');

router.get('/', TaskController.read);
router.post('/', TaskController.create);
router.delete('/:id', TaskController.delete);

module.exports = router;