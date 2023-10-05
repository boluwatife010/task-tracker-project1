import express from 'express';
import { createTaskHandler, getATaskHandler, getAllTasksHandler,
     searchATaskHandler, updateATaskHandler, deleteATaskHandler,
     filterTasksHandler, categorizeTaskHandler, historyTaskHandler,
      priorityTaskHandler, statusTaskHandler, archiveTaskHandler, sharingTaskHandler, statisticsOfTaskHandler} from 'src/controllers/task.controllers';
import { commentTaskHandler, getCommentHandler, deleteCommentHandler } from 'src/controllers/comment.controllers';
import { createTaskAttachment, getTaskAttachment, deleteTaskAttachment } from 'src/services/attachment.services';
import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({ storage });
const router = express.Router();
router.post('/create', createTaskHandler);
router.get('/',getAllTasksHandler );
router.get('/:id',getATaskHandler );
router.put('/update/:id',updateATaskHandler );
router.get('/search/:id',searchATaskHandler );
router.delete('/delete/:id',deleteATaskHandler );
router.get('/filter/:id', filterTasksHandler);
router.get('/categories/:id', categorizeTaskHandler);
router.post('/comment/create/:id', commentTaskHandler);
router.get('/comments/:id', getCommentHandler);
router.delete('/delete-comments/:id', deleteCommentHandler );
router.get('/history/:id',historyTaskHandler )
router.patch('/priority/:id', priorityTaskHandler);
router.get('/status-update', statusTaskHandler);
router.post('/create/attachment/:id', upload.single('file'), createTaskAttachment);
router.get('/attachment/:id', getTaskAttachment);
router.delete('/delete/attachment/:id', deleteTaskAttachment)
router.get('/archives', archiveTaskHandler);
router.post('/sharing', sharingTaskHandler);
router.get('/statistics', statisticsOfTaskHandler);

export default router;