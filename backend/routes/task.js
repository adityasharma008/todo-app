import express from "express"
import { getAllTasks, createTask, updateTask, deleteTask } from "../controllers/task.js"

const router = express.Router()

router.route('/').get(getAllTasks).post(createTask)
router.route('/:id').patch(updateTask).delete(deleteTask)

export default router