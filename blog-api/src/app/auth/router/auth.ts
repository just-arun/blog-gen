import { Router } from "express";
import { AuthController } from "../controller/auth";

const AuthRoute = Router();
const controller = new AuthController();

AuthRoute.post("/login", controller.login);
AuthRoute.post("/logout", controller.logout);

export default AuthRoute;

