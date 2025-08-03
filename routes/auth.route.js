import { Router } from 'express';
import { singIn, singOut, singUp } from '../controllers/auth.controllers.js';

//? contollers

const authRoute = Router();

authRoute.post('/singup', singUp);
authRoute.post('/singin', singIn);
authRoute.post('/singout', singOut);

export default authRoute;
