import userModel from '../models/userModel.js'

const isAuthenticated = async (req, res) => { 
   try {
      return res.status(200).json({message: 'Authenticated'})
   } catch(error) {
      res.status(400).json({message: error})
   }
}

const getUserData = async (req, res) => {
   try {
      const {userId} = req

      const user = await userModel.findById(userId)

      if(!user) {
         return res.status(400).json({message: 'User not found'})
      }

      return res.status(200).json({name: user.name, email: user.email, tasks: user.tasks})
   } catch(error) {
      res.status(400).json({message: error})
   }
}

export {isAuthenticated, getUserData}