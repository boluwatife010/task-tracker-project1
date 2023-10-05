import mongoose from "mongoose";
const Schema = mongoose.Schema;
const attachmentSchema = new Schema ({
    filename: String,
    contentType: String,
    task: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Task'},
    data: Buffer,
    size: Number
});
export const attachmentModel = mongoose.model('attachment', attachmentSchema);