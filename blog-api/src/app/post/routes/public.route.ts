import { Router } from "express";
import { PostController } from "../controller/post";
import { AuthMiddleware } from "../../../middlewares/auth/authMiddleware";

const PostPublicRoute = Router();
const controller = new PostController();
PostPublicRoute.get("/", AuthMiddleware(['user']),  controller.getAll);
PostPublicRoute.get("/:link", controller.getOneRendered);

export default PostPublicRoute;
