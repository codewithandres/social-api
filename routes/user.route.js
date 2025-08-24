import { Router } from 'express';

//? contollers
import { getAllUser, searchUsers } from '../controllers/user.controllers.js';

const router = Router();

router.get('/', getAllUser);
router.get('/search', searchUsers);
export default router;
