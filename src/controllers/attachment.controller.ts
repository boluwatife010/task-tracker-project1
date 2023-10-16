import express from 'express';
import { createTaskAttachment,  getTaskAttachment, deleteTaskAttachment } from '../services/attachment.services';
import mongoose from 'mongoose';
export const createTaskAttachmentHandler = async (req: express.Request, res: express.Response) => {
    const {taskId} = req.params;
    const file = req.file as Express.Multer.File;

    if (!file) {
      return res.status(400).send({ message: 'Please provide a file.' });
    }
    const { filename, mimetype, buffer, size } = file;
    try {
        if (!!filename || !mimetype || !buffer ||!size) {
            return res.status(400).send({message: 'Could not create file'});
        }
        const newAttachment = await createTaskAttachment({
            taskId: new mongoose.Types.ObjectId(taskId),
            filename,
            mimetype,
            data: buffer, 
            size,
          });
          if (!newAttachment) {
            return res.status(400).send({error: 'Could not create the attachment file'})
          }
          res.status(201).send({ message: 'Successfully created a new attachment', data: newAttachment });
    }   catch (err) {
        console.log(err, 'Invalid err');
        return res.status(500).send({message: 'Internal server error.'});
       }
   
 }

 export const getTaskAttachmentHandler = async (req: express.Request, res: express.Response) => {
    const {taskId} = req.params;
    try {
        const getAttachment = await getTaskAttachment(taskId);
        if (!getAttachment) {
            return res.status(400).send({message: 'Could not get attached file'})
        }
        return res.status(200).send({message: 'Successfully got attached file', data: getAttachment});
    }   catch (err) {
        console.log(err, 'Invalid err');
        return res.status(500).send({message: 'Internal server error.'});
       }
 }

 export const deleteTaskAttachmentHandler = async (req: express.Request, res: express.Response) => {
    const {id} = req.params;
    try {
        if (!id) {
            return res.status(400).send({message: 'Please provide a valid comment id'});
        }
        const deleteAttachment = await deleteTaskAttachment(id);
        // if (!deleteAttachment) {
         //   return res.status(400).send({message: 'Could not delete comment with id'});
       // }
        return res.status(200).send({message: 'Successfully deleted attached file', data: deleteAttachment});
    }   catch (err) {
        console.log(err, 'Invalid err');
        return res.status(500).send({message: 'Internal server error.'});
       }
 }