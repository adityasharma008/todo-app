const getAllTasks = (req, res) => {
   res.send('All Tasks')
}

const createTask = (req, res) => {
   res.json(req.body)
}

const updateTask = (req, res) => {
   res.send('Update Task')
}

const deleteTask = (req, res) => {
   res.send('Delete Task')
}

export {getAllTasks, createTask, updateTask, deleteTask}