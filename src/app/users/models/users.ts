import { Schema, model } from "mongoose";

export const UserModel = model(
  "User",
  new Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      unique: true,
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    roll: {
      type: [String],
      required: true
    }
  })
);

export class User {
  _id?: string;
  name?: string;
  email?: string;
  password?: string;
  roll?: Array<string>;
}
