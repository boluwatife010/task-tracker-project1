import express from 'express';
import { authenticateAuthToken } from 'src/middleware/auth';
import { userRegistrationHandler, userLoginHandler, updateUserHandler,getAUserHandler,deleteAUserHandler, getAllUsersHandler } from '../controllers/user.controllers';
const router = express.Router();
router.post('/register', userRegistrationHandler );
router.post('/login/:id', authenticateAuthToken, userLoginHandler);
router.put('/update/:id', authenticateAuthToken, updateUserHandler );
router.get('/:id',authenticateAuthToken,  getAUserHandler );
router.get('/', getAllUsersHandler);
router.delete('/delete/:id', authenticateAuthToken,  deleteAUserHandler);
export default router