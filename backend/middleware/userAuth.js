import jwt from 'jsonwebtoken'

const userAuth = (req, res, next) => {
   const {token} = req.cookies;

   try {
      const tokenDecode = jwt.verify(token, env.process.JWT_SECRET)

      if(tokenDecode.id) {
         req.userId = tokenDecode.id
      } else {
         return res.status(401).json({message: 'Not Authorised'})
      } 

      next()
   } catch(error) {
      return res.status(400).json({message: error.message})
   }
}

export default userAuth