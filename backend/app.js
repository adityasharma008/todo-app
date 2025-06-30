import express from 'express'
import tasks from './routes/task.js'

const app = express()

app.use(express.json())
app.use('/api/v1/tasks', tasks)

const port = 5000
app.listen(port, console.log(`Listening on port: ${port}`))