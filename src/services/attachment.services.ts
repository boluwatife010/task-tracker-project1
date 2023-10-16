import { attachmentModel } from "../model/attachment.model";
//import multer from "multer";
import { attachmentRequestBody } from "../interface/task.interface";
/*
const storage = multer.memoryStorage(); 
const upload = multer({ storage });
*/
// Function to upload attachment files.
export const createTaskAttachment = async (file: attachmentRequestBody) => {
   const createAttachment = await attachmentModel.create(file);
   if (!createAttachment) {
    throw new Error ('Could not create attachment.');
   }
   return createAttachment;
}
// Function to get attached file from id
export const getTaskAttachment = async (taskId: string ) => {
  const getAttachment = await attachmentModel.find({ task: taskId });
  if (!getAttachment) {
    throw new Error ('Could not get attachment with specific file for attachment');
  }
  return getAttachment;
}
// Function to delete attached file by id
export const deleteTaskAttachment = async (id: string) => {
  const deleteAttachment = await attachmentModel.findByIdAndDelete({id});
  if (!deleteAttachment) {
    throw new Error ('Could not delete the attachment with the specified id');
  }
}