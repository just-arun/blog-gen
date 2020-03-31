import { Router } from "express";
import { PostController } from "../controller/post";

const PostPrivateRoute = Router();
let controller = new PostController();

PostPrivateRoute.post("/", controller.createPost);

export default PostPrivateRoute;
