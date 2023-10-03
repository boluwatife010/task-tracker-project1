import express from 'express';
import { userRegistrationHandler, userLoginHandler, updateUserHandler,getAUserHandler,deleteAUserHandler, getAllUsersHandler } from '../controllers/user.controllers';
const router = express.Router();
router.post('/register', userRegistrationHandler );
router.post('/login/:id', userLoginHandler);
router.put('/update/:id', updateUserHandler );
router.get('/:id', getAUserHandler );
router.get('/', getAllUsersHandler);
router.delete('/delete/:id', deleteAUserHandler);
export default router