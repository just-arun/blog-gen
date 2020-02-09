import { User, UserModel } from "./../models/users";
import { hash, genSalt } from "bcryptjs";
import { ObjectID } from "bson";

export default class UserService {
  static async create(user: User): Promise<any> {
    return genSalt(10)
      .then(salt =>
        hash(user.password || "", salt)
          .then((newPassword: any) => {
            user.password = newPassword;
            return new UserModel(user)
              .save()
              .then(res => res)
              .catch(err => Promise.reject(err));
          })
          .catch(err => Promise.reject(err))
      )
      .catch(err => Promise.reject(err));
  }

  static async findOne(query: {}, fields: Array<string>): Promise<any> {
    let orgaFields: any = {};
    fields.forEach(item => (orgaFields[item] = 1));
    return UserModel.findOne(query, orgaFields)
      .lean()
      .exec()
      .then(data => data)
      .catch(err => Promise.reject(err));
  }

  static async findAll(
    query: {},
    fields: Array<string>,
    sort?: Array<any>,
    from?: number
  ): Promise<any> {
    let orgaFields: any = {};
    fields.forEach(item => (orgaFields[item] = 1));
    return UserModel.find(query, orgaFields)
      .sort({ [String(sort ? sort[0] : "")]: sort ? sort[1] : 1 })
      .skip(from ? from : 0)
      .limit(from ? from : 0 + 10)
      .lean()
      .exec()
      .then(data => data)
      .catch(err => Promise.reject(err));
  }

  static async update(id: string, user: User): Promise<any> {
    try {
      let _id = new ObjectID(id);
      return UserModel.findOneAndUpdate(_id, {
        $set: user
      })
        .lean()
        .exec()
        .then(data => data)
        .catch(err => Promise.reject(err));
    } catch (err) {
      Promise.reject(err);
    }
  }
}
