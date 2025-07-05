import userModel from '../models/userModel.js'
import asyncWrapper from '../middleware/async-wrapper.js'

const getAllTasks = asyncWrapper(async (req, res) => {
   const user = await userModel.findById(req.userId)
   if (!user) return res.status(404).json({ msg: 'User not found' })

   res.status(200).json({ tasks: user.tasks })
})

const createTask = asyncWrapper(async (req, res) => {
   const user = await userModel.findById(req.userId)
   if (!user) return res.status(404).json({ msg: 'User not found' })
   user.tasks.push(req.body)
   await user.save()

   const newTask = user.tasks[user.tasks.length - 1]
   res.status(201).json({ newTask })
})

const updateTask = asyncWrapper(async (req, res) => {
   const { id: taskID } = req.params

   const user = await userModel.findById(req.userId)
   if (!user) return res.status(404).json({ msg: 'User not found' })

   const task = user.tasks.id(taskID)
   if (!task) return res.status(404).json({ msg: `No task with id: ${taskID}` })

   task.set(req.body)
   await user.save()

   res.status(200).json({ task })
})

const deleteTask = asyncWrapper(async (req, res) => {
   const { id: taskID } = req.params
   const user = await userModel.findById(req.userId)
   if (!user) return res.status(404).json({ msg: 'User not found' })
   const task = user.tasks.id(taskID)
   if (!task) return res.status(404).json({ msg: `No task with id: ${taskID}` })
   user.tasks.pull(taskID)
   await user.save()

   res.status(200).json({ msg: 'Task deleted successfully' })
})


export {getAllTasks, createTask, updateTask, deleteTask}