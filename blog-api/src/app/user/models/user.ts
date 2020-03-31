import { Schema, model } from "mongoose";
import { ObjectID } from "bson";

export const UserModel = model(
  "User",
  new Schema({
    user_name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    blogs: [{
        type: ObjectID,
        ref: 'Posts',
        default: new Array(0)
    }],
    login: {
        type: ObjectID,
        default: null
    },
    roll: [{
      type: String,
      required: true,
      default: "user"
    }]
  })
);

export class User {
    public user_name!: string;
    public email!: string;
    public password!: string;
    public blogs?: ObjectID[];
    public login?: ObjectID;
    public roll!: string[];
}