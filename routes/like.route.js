import { Router } from 'express';
import { getLikes } from '../controllers/like.controllers.js';
//? contollers

const router = Router();

router.get('/', getLikes);

export default router;
