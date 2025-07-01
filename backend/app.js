import express from 'express'
import tasks from './routes/task.js'
import { connectDB } from './db/connect.js'
import dotenv from 'dotenv'

dotenv.config()
const app = express()

app.use(express.json())
app.use('/api/v1/tasks', tasks)

const port = 5000

const start = async() => {
   try {
      await connectDB(process.env.MONGO_URI)
      app.listen(port, console.log(`Listening on port: ${port}`))
   } catch(err) {
      console.log(err)
   }
}

start()

