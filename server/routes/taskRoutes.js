const router = require('express').Router();
const TaskController = require('../controllers/TaskController');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

router.get('/', TaskController.read);
router.use(authentication);
router.post('/', TaskController.create);
router.delete('/:id', authorization, TaskController.delete);

module.exports = router;