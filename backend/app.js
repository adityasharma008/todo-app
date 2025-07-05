import express from 'express'
import tasks from './routes/task.js'
import authRouter from './routes/authRouter.js'
import connectDB from './db/connect.js'
import dotenv from 'dotenv'
import notFound from './middleware/not-found.js'
import errorHandler from './middleware/error-handler.js'
import cors from 'cors'

dotenv.config()
const app = express()

app.use(express.json())
app.use(cors())
app.use('/api/v1/tasks', tasks)
app.use('/api/v1/auth', authRouter)


app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT || 5000

const start = async() => {
   try {
      await connectDB(process.env.MONGO_URI)
      app.listen(port, console.log(`Listening on port: ${port}`))
   } catch(err) {
      console.log(err)
   }
}

start()

