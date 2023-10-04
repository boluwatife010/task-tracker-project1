import express from 'express';
import { getCommentTask, commentTask, deleteCommentTask } from 'src/services/comment.service';
// A function to handle the create a comment handler
export const commentTaskHandler = async (req: express.Request, res: express.Response) => {
    const {comment} = req.body;
   try {
    if (!comment) {
        return res.status(400).send({message: 'Could not create comment'});
    }
    const createComment = await commentTask(comment);
    if (!createComment) {
        return res.status(400).send({message: 'Could not create the comment'});
    }
    return res.status(200).send({message: 'Successfully created comment', data: createComment});
   }    catch (err) {
    console.log(err, 'Invalid err');
    return res.status(500).send({message: 'Internal server error.'});
   }
};
export const getCommentHandler = async (req: express.Request, res: express.Response) => {
    const {commentId} = req.params;
    try {
        if (!commentId) {
            return res.status(400).send({message: 'Please provide a valid comment id'});
        }
        const getComment = await getCommentTask(commentId);
        if (!getComment) {
            return res.status(400).send({message: 'Could not get comment with specific id'});
        }
        return res.status(200).send({message: 'Successfully got comment', data: getComment});
    }   catch (err) {
        console.log(err, 'Invalid err');
        return res.status(500).send({message: 'Internal server error.'});
       }
}
export const deleteCommentHandler = async (req: express.Request, res: express.Response) => {
    const {commentId} = req.params;
    try {
        if (!commentId) {
            return res.status(400).send({message: 'Please provide a valid comment id'});
        }
        const deleteComment = await deleteCommentTask(commentId);
        if (!deleteComment) {
            return res.status(400).send({message: 'Could not delete comment with id'});
        }
        return res.status(200).send({message: 'Successfully deleted the comment'});
    }   catch (err) {
        console.log(err, 'Invalid err');
        return res.status(500).send({message: 'Internal server error.'});
       }
}