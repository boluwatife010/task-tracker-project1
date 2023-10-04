import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const commentSchema = new Schema ({
        comment : String,
        commentId: { type: mongoose.Schema.Types.ObjectId}
},
{timestamps: true}
);
export const commentModel = mongoose.model('Comment', commentSchema);