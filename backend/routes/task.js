import express from "express"
import userAuth from "../middleware/userAuth.js"
import { getAllTasks, createTask, updateTask, deleteTask } from "../controllers/task.js"

const router = express.Router()


router.use((req, res, next) => {
   next()
})


router.get('/', userAuth, getAllTasks)
router.post('/', userAuth, createTask)
router.patch('/:id', userAuth, updateTask)
router.delete('/:id', userAuth, deleteTask)

export default router