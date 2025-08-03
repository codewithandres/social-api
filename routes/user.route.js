import { Router } from 'express';

//? contollers
import { getAllUser } from '../controllers/user.controllers.js';

const router = Router();

router.get('/find/:userID', getAllUser);

export default router;
