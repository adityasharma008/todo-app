import express from 'express'
import userAuth from '../middleware/userAuth.js'
import { isAuthenticated, getUserData } from '../controllers/userController.js'


const userRouter = express.Router()

userRouter.get('/isAuth', userAuth, isAuthenticated)
userRouter.get('/data', userAuth, getUserData)

export default userRouter
