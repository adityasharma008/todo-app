import Task from '../models/task.js'

const getAllTasks = (req, res) => {
   res.send('All Tasks')
}

const createTask = async (req, res) => {
   const task = await Task.create(req.body)
   res.status(201).json({ task })
}

const updateTask = (req, res) => {
   res.send('Update Task')
}

const deleteTask = (req, res) => {
   res.send('Delete Task')
}

export {getAllTasks, createTask, updateTask, deleteTask}