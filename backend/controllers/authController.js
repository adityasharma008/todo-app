import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js'


const register = async (req, res) => {
   try {
      const {name, email, password} = req.body

      if(!name || !email || !password) {
         return res.status(400).json({message: 'Missing details'})
      }

      const existingUser = await userModel.findOne({email})

      if (existingUser) {
         return res.status(400).json({message: 'User already registered'})
      }

      const hashedPassword = await bcrypt.hash(password, 10)

      const user = new userModel({name, email, password})
      user.save()

      const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'})

      res.cookie('token', token, {
         httpOnly: true,
         secure: process.env.NODE_ENV === 'production',
         sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
         maxAge: 1 * 60 * 60 * 1000
      })

      return res.status(200).json({message: 'User registered!'})

   } catch(error) {
      res.status(400).json({message: error.message})
   }
}

const login = async (req, res) => {
   const { email, password } = req.body

   if (!email || !password) {
      return res.status(400).json({ message: 'Missing details' })
   }
   
   try {
      const user = await userModel.findOne({email})

      if(!user) {
         return res.status(400).json({message: 'Wrong email or password'})
      }

      const isMatch = bcrypt.compare(password, user.password)

      if(!isMatch) {
         return res.status(400).json({message: 'Wrong email or password'})
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {expiresIn: '1h'})

      res.cookie('token', token, {
         httpOnly: true,
         secure: process.env.NODE_ENV === 'production',
         sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
         maxAge: 1 * 60 * 60 * 1000
      })

      return res.status(200).json({ message: 'Login Successful!' })

   } catch (error) {
      res.status(400).json({ message: error.message })
   }
}

const logout = async (req, res) => {
   try {
      res.clearCookie('token', {
         httpOnly: true,
         secure: process.env.NODE_ENV === 'production',
         sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict'
      })

      return res.status(200).json({ message: 'Logged Out' })
   } catch(error) {
      return res.status(400).json({message: error.message})
   }
}

export {register, login, logout}