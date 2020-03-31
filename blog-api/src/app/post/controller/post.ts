import { NextFunction, Request, Response } from "express";
import PostService from "../service/post";
import { Post } from "../models/post";
import { Success } from "../../../middlewares/successHandle";
import { ErrorHandle } from "../../../middlewares/errorHandle";
import { HttpStatus } from "../../../util/serverStatus";

export class PostController {
  async createPost(req: Request, res: Response, next: NextFunction) {
    let post: Post = req.body;
    return new PostService()
      .createPost(post)
      .then(data => res.status(HttpStatus("ok")).json(Success(data)))
      .catch(err => {
        console.log({ err });
        next(err);
      });
  }
  async updatePost(req: Request, res: Response, next: NextFunction) {}

  async getAll(req: any, res: Response, next: NextFunction) {
    console.log({"user": req['email']});
    return new PostService()
      .getAll(req.query.page)
      .then(data => res.status(HttpStatus("ok")).json(Success(data)))
      .catch(err => next(err));
  }

  async getOneRendered(req: Request, res: Response, next: NextFunction) {
    return new PostService()
      .getOneRendered(req.params.link)
      .then(data => res.status(HttpStatus("ok")).json(Success(data)))
      .catch(err => next(err));
  }
}
