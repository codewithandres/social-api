import { Router } from 'express';
import { deleteFollow, getFollows, newFollow } from '../controllers/follow.controller.js';

const router = Router();

router.get('/', getFollows);
router.post('/', newFollow);
router.delete('/', deleteFollow);

export default router;
