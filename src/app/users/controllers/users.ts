import { User } from "./../models/users";
import { Request, Response, NextFunction } from "express";
import UserService from "../services/users";

export default class UserController {
  static async create(req: Request, res: Response, next: NextFunction) {
    const user: User = req.body;
    return UserService.create(user).then(output => {
      console.log(output);
      res.render("index");
    });
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    return res.render("login", {
      title: "BlogGen | Login",
      description: "login in to blog-gen",
      keywords: "blog-gen login",
      styles: ["login/login.css"],
      scripts: ["login/login.js"],
      bodyData: "this is bloggen"
    });
  }
}
