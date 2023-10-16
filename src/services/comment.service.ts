import { commentModel } from "../model/comment.model";
import { commentTaskRequestBody } from "../interface/task.interface";
// A function or users to be able to comment on a task
export const commentTask = async (body: commentTaskRequestBody) => {
    const {comment} = body;
    if (!comment) {
        throw new Error ('Could not get a comment');
    }
    const commenting = await commentModel.create({comment});
    if (!commenting) {
        throw new Error ('Could not create comment');
    }
    await commenting.save();
    return commenting;
}
// A function to get a commented task by it's id
export const getCommentTask = async (commentId: string) => {
    const getComment = await  commentModel.findById({ commentId });
    if (!getComment) {
        throw new Error ('Could not get a comment');
    }
    return getComment;
}
// A function to delete a comment by it's id
export const deleteCommentTask = async (commentId: string) => {
    const deleteComment = await commentModel.findById({commentId});
    if (!deleteComment) {
        throw new Error ('Could not delete comment');
    }
    return deleteComment;
}
