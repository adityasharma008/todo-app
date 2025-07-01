import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
   name:{
      type: String,
      required: [true, 'must provide name'],
      trim: true,
      maxlength: [25, 'name cannot be more than 25 chars']
   },
    completed:{
      type: Boolean,
      default: false
    }
})

export default mongoose.model('Task', TaskSchema)