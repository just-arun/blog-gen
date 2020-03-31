import express, { Application } from "express";
import path from "path";
import Database from "./boot/database";
import cors from "cors";
import cookieParser from "cookie-parser";
import PostRoute from "./app/post/routes";
import { ErrorHandle, ErrorObject } from "./middlewares/errorHandle";
import AuthRoute from "./app/auth/router/auth";
import UserRoute from "./app/user/routes";
import Configuration from "./config/config";
const { json, urlencoded } = express;
const app: Application = express();

const config = new Configuration();
var whitelist = config.corsWhiteList;
var corsOptions = {
  origin: function(origin: any, callback: any) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, true);
      //   callback(ErrorObject("UnAuthorized", "Not allowed by CORS"));
    }
  },
  credentials: true
};

// init db
new Database();
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/auth", AuthRoute);
app.use("/user-create", UserRoute.Public);
app.use("/user-update", UserRoute.Private);
app.use("/post-update", PostRoute.private);
app.use("/post-get", PostRoute.public);
app.use(ErrorHandle);

export default app;
