import express from 'express';
import { createTaskHandler, getATaskHandler, getAllTasksHandler,
     searchATaskHandler, updateATaskHandler, deleteATaskHandler,
     filterTasksHandler, categorizeTaskHandler} from 'src/controllers/task.controllers';
const router = express.Router();
router.post('/create', createTaskHandler);
router.get('/',getAllTasksHandler );
router.get('/:id',getATaskHandler );
router.put('/update/:id',updateATaskHandler );
router.get('/search/:id',searchATaskHandler );
router.delete('/delete/:id',deleteATaskHandler );
router.get('/filter/:id', filterTasksHandler);
router.get('/categories/:id', categorizeTaskHandler);
router.get('/comments/:id', );
router.post('/comment/create/:id', );
router.delete('/delete-comments/:id', );
router.get('/history/:id', )
router.patch('/priority/:id', );
router.get('/status-update', );
router.post('/attachment/:id', );
router.get('/archives', );
router.post('/sharing', );
router.get('/statistics', );

export default router;