import { Router } from 'express';
//? contollers
import { getPosts } from '../controllers/post.controllers.js';

const router = Router();

router.get('/', getPosts);

export default router;
