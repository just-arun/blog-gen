import { Response, Request, NextFunction } from "express";
import { ObjectID } from 'bson';
import { AuthService } from "../service/auth";
import { User } from "../../user/models/user";
import { HttpStatus } from "../../../util/serverStatus";
import Configuration from "../../../config/config";

export class AuthController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      let user: User = req.body;
      return new AuthService()
        .login(user)
        .then((data: any) => {
          const config = new Configuration();
          let access = data.token.access;
          let refresh = data.token.refresh;
          res.cookie(
            config.accessCookie,
            { ref: access },
            { httpOnly: true, maxAge: 600000 }
          );
          res.cookie(
            config.refreshCookie,
            { ref: refresh },
            { httpOnly: true, maxAge: config.oneWeek }
          );
          res.sendStatus(HttpStatus("ok"));
        })
        .catch(err => next(err));
    } catch (err) {
      next(err);
    }
  }
  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      let id = new ObjectID(req.params.id)
      return new AuthService().logout(id).then(data => {
        const config = new Configuration();
        res.cookie(config.accessCookie, null, { httpOnly: true, maxAge: -1 });
        res.cookie(config.refreshCookie, null, { httpOnly: true, maxAge: -1 });
        res.sendStatus(HttpStatus("ok"));
      }).catch((err: any) => next(err))
    } catch (err) {
      next(err);
    }
  }
}
