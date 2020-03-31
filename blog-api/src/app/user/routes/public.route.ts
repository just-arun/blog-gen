import { Router } from 'express';
import { UserController } from '../controller/user';


const UserPublicRoute = Router();
const controller = new UserController()

UserPublicRoute.post("/", controller.createUser);

export default UserPublicRoute