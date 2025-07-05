import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
   taskName:{
      type: String,
      required: [true, 'must provide task name'],
      trim: true,
      maxlength: [25, 'name cannot be more than 25 chars']
   },
    completed:{
      type: Boolean,
      default: false
    }
})

const userSchema = new mongoose.Schema({
   name: {
      type: String,
      required: [true, 'must provide name'],
      trim: true,
      maxlength: [50, 'name cannot be more than 50 chars']  
   },
   email: {
      type: String,
      required: [true, 'must provide email'],
      trim: true,
      maxlength: [50, 'name cannot be more than 50 chars'],
      unique: true
   }, 
   password: {
      type: String,
      required: [true, 'must provide password'],
      trim: true
   },
   resetOtp: { 
      type: String, 
      default: '' 
   },
   resetOtpExpiredAt: { 
      type: Number, 
      default: 0
   },
   tasks: [TaskSchema]
})

export default mongoose.model('User', userSchema)