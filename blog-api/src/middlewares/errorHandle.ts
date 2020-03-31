import { NextFunction, Response, Request } from "express";
import { ErrorClass } from "./errorClass";
import { HttpStatus } from "../util/serverStatus";

export const ErrorHandle = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
    console.error(err);
  return res.status(HttpStatus(err.name)).json({ error: { message: err.message } });
};


export const ErrorObject = (name: string, message: string) => {
  console.error({
    message,
    name
  });
  return {
    message,
    name
  }
}