import { Router } from 'express';
import UserController from '../controllers/users';

const userPublicRoute = Router();

// userPublicRoute.post('/regester', );
userPublicRoute.get('/login', UserController.login);

export default userPublicRoute;