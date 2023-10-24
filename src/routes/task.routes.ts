import express from 'express';
import { authenticateAuthToken } from 'src/middleware/auth';
import { createTaskHandler, getATaskHandler, getAllTasksHandler,
     searchATaskHandler, updateATaskHandler, deleteATaskHandler,
     filterTasksHandler, categorizeTaskHandler, historyTaskHandler,
      priorityTaskHandler, statusTaskHandler, archiveTaskHandler, sharingTaskHandler, statisticsOfTaskHandler} from '../controllers/task.controllers';
import { commentTaskHandler, getCommentHandler, deleteCommentHandler } from '../controllers/comment.controllers';
import { createTaskAttachment, getTaskAttachment, deleteTaskAttachment } from '../services/attachment.services';
import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({ storage });
const router = express.Router();
router.post('/create', createTaskHandler);
router.get('/',getAllTasksHandler );
router.get('/:id', authenticateAuthToken, getATaskHandler );
router.put('/update/:id', authenticateAuthToken, updateATaskHandler );
router.get('/search/:id', authenticateAuthToken, searchATaskHandler );
router.delete('/delete/:id', authenticateAuthToken, deleteATaskHandler );
router.get('/filter/:id', authenticateAuthToken,  filterTasksHandler);
router.get('/categories/:id', authenticateAuthToken,  categorizeTaskHandler);
router.post('/comment/create/:id', authenticateAuthToken,  commentTaskHandler);
router.get('/comments/:id', authenticateAuthToken,  getCommentHandler);
router.delete('/delete-comments/:id', authenticateAuthToken,  deleteCommentHandler );
router.get('/history/:id', authenticateAuthToken, historyTaskHandler )
router.patch('/priority/:id', authenticateAuthToken,  priorityTaskHandler);
router.get('/status-update', statusTaskHandler);
router.post('/create/attachment/:id', authenticateAuthToken,  upload.single('file'), createTaskAttachment);
router.get('/attachment/:id', authenticateAuthToken,  getTaskAttachment);
router.delete('/delete/attachment/:id', authenticateAuthToken,  deleteTaskAttachment)
router.get('/archives', archiveTaskHandler);
router.post('/sharing', sharingTaskHandler);
router.get('/statistics', statisticsOfTaskHandler);

export default router;