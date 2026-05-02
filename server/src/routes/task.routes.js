import express from 'express'
import { createTask, deleteTask, getTasks, markComplete, updateTask } from '../controllers/task.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js'

const taskRouter = express.Router();

taskRouter.post('/',authMiddleware, createTask);
taskRouter.get('/',authMiddleware, getTasks);
taskRouter.put('/:id',authMiddleware, updateTask);
taskRouter.delete('/:id',authMiddleware, deleteTask);
taskRouter.patch('/:id/complete',authMiddleware, markComplete)

export default taskRouter;