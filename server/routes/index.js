const router = require('express').Router();
const taskRouter = require('./taskRoutes');
const userRouter = require('./userRoutes');


router.use('/users', userRouter);
router.use('/tasks', taskRouter);

module.exports = router;