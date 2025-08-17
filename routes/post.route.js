import { Router } from 'express';
//? contollers
import { getPosts, createPost } from '../controllers/post.controllers.js';

const router = Router();

router.get('/', getPosts);
router.post('/', createPost);

export default router;
