import express, {
  Application,
  json,
  urlencoded,
  static as stat
} from "express";
import expressLayouts from "express-ejs-layouts";
import path from "path";
import UserRoutes from "./app/users/routes";

const app: Application = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(stat(path.join(__dirname, "public")));
app.use(expressLayouts);

// config routes
app.get("/", (req, res) =>
  res.render("index", {
    title: "Example",
    description: "This is a message",
    keywords: 'sdfs, dfadsf, dsaf',
    bodyData: "this is a damn body"
  })
);

app.use("/user", UserRoutes.Public);

export default app;
