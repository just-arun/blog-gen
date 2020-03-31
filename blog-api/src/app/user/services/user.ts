import { ObjectID } from "bson";
import { UserModel, User } from "../models/user";
import Bcrypt from "bcryptjs";
import { ErrorObject } from "../../../middlewares/errorHandle";

export class UserService {
  async createOne(user: User) {
    return UserModel.findOne({ email: user.email })
      .then(res => {
        if (res) {
          return Promise.reject(
            ErrorObject("Conflict", "User already exist with the same email address")
          );
        } else {
        return UserModel.findOne({ user_name: user.user_name })
        .then(res => {
            if (res) {
                return Promise.reject(
                  ErrorObject("Conflict", "User Name taken Please choose another Name")
                );
            } else {
                return Bcrypt.genSalt(10)
                  .then(salt =>
                    Bcrypt.hash(user.password, salt)
                      .then(hash => {
                        user.password = hash;
                        return new UserModel(user)
                          .save()
                          .then(res => res)
                          .catch(err => Promise.reject(err));
                      })
                      .catch(err => Promise.reject(err))
                  )
                  .catch(err => Promise.reject(err));
                }
        }).catch(err => Promise.reject(err))
        }
      })
      .catch(err => Promise.reject(err));
  }

  async updateOne(_id: ObjectID, user: User) {
    delete user.blogs;
    delete user.login;
    return UserModel.findOneAndUpdate(
      { _id },
      {
        $set: user
      }
    )
      .exec()
      .then(res => res)
      .catch(err => Promise.reject(err));
  }
}
