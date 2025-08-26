import { Router } from 'express';
import { getLikes, toggleLike } from '../controllers/like.controllers.js';
//? contollers

const router = Router();

router.get('/', getLikes);

router.post('/', toggleLike);

export default router;
