import { Router } from 'express';
import { createdComment, getComments } from '../controllers/comment.controllers.js';

//? contollers

const router = Router();

router.get('/', getComments);
router.post('/', createdComment);

export default router;
