import express from 'express';
import { createTaskHandler, getATaskHandler, getAllTasksHandler,
     searchATaskHandler, updateATaskHandler, deleteATaskHandler } from 'src/controllers/task.controllers';
const router = express.Router();
router.post('/create', createTaskHandler);
router.get('/',getAllTasksHandler );
router.get('/:id',getATaskHandler );
router.put('/update/:id',updateATaskHandler );
router.get('/search/:id',searchATaskHandler );
router.delete('/delete/:id',deleteATaskHandler );
router.get('/filter/:id', );
router.get('/categories/:id', );
router.get('/comments/:id', );
router.post('/comments', );
router.delete('/delete-comments/:id', );
router.get('/history', )
router.put('/priority', );
router.get('/status-update', );
router.post('/attachment/:id', );
router.get('/archives', );
router.post('/sharing', );
router.get('/statistics', );

export default router;