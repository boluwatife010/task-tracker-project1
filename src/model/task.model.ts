import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const  taskSchema =new Schema ({
    title: {
        type: String,
        required: true,
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
    }

})
export const taskModel = mongoose.model('Task',taskSchema );