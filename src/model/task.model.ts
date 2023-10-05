import mongoose from 'mongoose';
const Schema = mongoose.Schema;
type TaskStatus = "To do" | "In progress" | "Done";
const  taskSchema =new Schema ({
    title: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        unique: true,
      },
    description: {
        type: String,
        required: true,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    notes: {
        type: String
    },
    sharedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    history: [String],
    priority: String,
    status: {
        type: String,
        enum: ["To do", "In progress", "Done"] as TaskStatus[],
        default: 'To do'
    }

})
export const taskModel = mongoose.model('Task',taskSchema );