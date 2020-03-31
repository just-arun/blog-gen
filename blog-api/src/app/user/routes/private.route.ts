import { Router } from 'express';
import { UserController } from '../controller/user';


const UserPrivateRoute = Router();
const controller = new UserController()

UserPrivateRoute.put("/:id", controller.updateUser);

export default UserPrivateRoute