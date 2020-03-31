import { Request, Response, NextFunction } from "express";
import { ObjectID } from "bson";
import { UserService } from "../services/user";
import { User } from "../models/user";
import { HttpStatus } from "../../../util/serverStatus";
import { Success } from "../../../middlewares/successHandle";
export class UserController {
  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user: User = req.body;
      return new UserService()
        .createOne(user)
        .then(data => {
          res.status(HttpStatus("ok")).json(Success(data));
        })
        .catch(err => {
          next(err);
        });
    } catch (err) {
      next(err);
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const id = new ObjectID(req.params.id);
      const user: User = req.body;
      const data = new UserService().updateOne(id, user);
      res.status(HttpStatus("ok")).json(Success(data));
    } catch (err) {
      next(err);
    }
  }
}
