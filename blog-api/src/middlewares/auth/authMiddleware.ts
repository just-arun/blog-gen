import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ObjectID } from "bson";
import Configuration from "../../config/config";
import { ErrorObject } from "../errorHandle";
import { UserModel } from "../../app/user/models/user";
import { AuthService } from "../../app/auth/service/auth";

export const AuthMiddleware = (roll?: string[]) => {
  return async (req: any, res: Response, next: NextFunction) => {
    try {
      const config = new Configuration();
      const access = req.cookies[config.accessCookie];
      const refresh = req.cookies[config.refreshCookie];
      if (access !== undefined) {
        let token: any = jwt.verify(access.ref, config.jwtSecret);
        if (token.exp === undefined) {
          return next(ErrorObject("UnAuthorized", "Unauthorized"));
        }
        if (Date.now() > token.exp) {
          return next(ErrorObject("UnAuthorized", "Unauthorized"));
        }
        let login = new ObjectID(token.data.ref);
        return UserModel.findOne({ login })
          .then((user: any) => {
            if (!user) {
              return next(ErrorObject("UnAuthorized", "Unauthorized"));
            } else {
              req.email = user.email;
              req.uID = user._id;
              return next();
            }
          })
          .catch(err => {
            return next(err);
          });
      } else {
        if (refresh === undefined) {
          return next(ErrorObject("UnAuthorized", "Unauthorized"));
        }
        let token: any = jwt.verify(refresh.ref, config.jwtSecret);
        if (token.exp === undefined) {
          return next(ErrorObject("UnAuthorized", "Unauthorized"));
        }
        if (Date.now() > token.exp) {
          return next(ErrorObject("UnAuthorized", "Unauthorized"));
        }
        let login = new ObjectID(token.data.ref);
        return UserModel.findOne({ login })
          .then((user: any) => {
            if (!user) {
              console.log(3);
              return next(ErrorObject("UnAuthorized", "Unauthorized"));
            } else {
              req.email = user.email;
              req.uID = user._id;
              return new AuthService()
                .generateToken(user.email)
                .then(token => {
                  let accessT = token.access;
                  let refreshT = token.refresh;
                  res.cookie(
                    config.accessCookie,
                    { ref: accessT },
                    { httpOnly: true, maxAge: 600000 }
                  );
                  res.cookie(
                    config.refreshCookie,
                    { ref: refreshT },
                    { httpOnly: true, maxAge: config.oneWeek }
                  );
                  return next();
                })
                .catch(err => next(err));
            }
          })
          .catch(err => {
            return next(err);
          });
      }
    } catch (err) {
      next(err);
    }
  };
};
