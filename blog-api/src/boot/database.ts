import { connect } from "mongoose";
import Configuration from "../config/config";

export default class Database {
  constructor() {
    this.initFun();
  }
  private initFun() {
    connect(new Configuration().dbURI, {
      useNewUrlParser: true
    })
      .then(res => {
        console.log("Database connected...");
      })
      .catch(err => {
        console.log(err);
      });
  }
}
