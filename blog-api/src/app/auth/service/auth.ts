import { User, UserModel } from "../../user/models/user";
import Bcrypt from "bcryptjs";
import { ObjectID } from "bson";
import jwt from "jsonwebtoken";
import { ErrorObject } from "../../../middlewares/errorHandle";
import Configuration from "../../../config/config";

export class AuthService {
  async login(user: User) {
    console.log({user});
    
    return this.userCheck(user.email).then((exist: any) => {
      if (exist) {
        return this.comparePassword(user.password, exist.password)
          .then(async match => {
            console.log(match);
            const token = await this.generateToken(exist.email);
            delete exist.password;
            delete exist.login;
            return {
              token
            };
          })
          .catch(err => Promise.reject(err));
      } else {
        return Promise.reject(ErrorObject("NotFound", "User Not Found"));
      }
    });
  }
  async userCheck(email: string) {
    return UserModel.findOne({ email })
      .then(res => {
        console.log({res});
        
        if (res) {
          return res;
        } else {
          return UserModel.findOne({ user_name: email })
            .then(data => data)
            .catch(err => Promise.reject(err));
        }
      })
      .catch(err => Promise.reject(err));
  }
  async comparePassword(password: string, hash: string) {
    return Bcrypt.compare(password, hash)
      .then(match => {
        if (match) {
          return true;
        } else {
          return Promise.reject(
            ErrorObject("ValidationError", "wrong email or password")
          );
        }
      })
      .catch(err => Promise.reject(err));
  }
  async generateToken(email: string) {
    const login = new ObjectID(Date.now());
    return UserModel.updateOne(
      { email },
      {
        $set: {
          login
        }
      }
    )
      .then(res => {
        let config = new Configuration();
        let accessExp = new Date();
        let accExp = accessExp.setMinutes(accessExp.getMinutes() + 10)
        let access = jwt.sign(
          {
            data: {
              ref: login
            }
          },
          config.jwtSecret,
          { expiresIn: accExp }
        );
        let refreshExp = new Date()
        let days = refreshExp.setDate(refreshExp.getDate() + 7)
        let refresh = jwt.sign(
          {
            data: {
              ref: login
            }
          },
          config.jwtSecret,
          { expiresIn: days }
        );
        let token = { access, refresh };
        console.log({login});
        
        return token;
      })
      .catch(err => Promise.reject(err));
  }
  async logout(_id: ObjectID) {
    return UserModel.findOneAndUpdate({ _id }, { $set: { login: null } })
      .exec()
      .then(res => res)
      .catch(err => Promise.reject(err));
  }
}
