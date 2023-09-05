import crypto from "crypto";
import jwt from "jsonwebtoken";
import { userType } from "../../enums/auth";
import { User, userInstance } from "./model";
import { JWT_EXPIRE, JWT_SECRET } from "../../config/config";
import { mandatoryFieldsCheck } from "../../utlis/utils";
class UserEntity {
  private userName?: string;
  private email: string;
  private password: string;
  private hashPassword?: string;
  private salt?: string;
  private role: userType;

  constructor(email: string, password: string, name?: string) {
    this.email = email;
    this.password = password;
    if (name) {
      this.userName = name;
    }
    this.role = userType.user;
  }

  async validate(): Promise<{
    status: boolean;
    msg: string;
    reason?: string | undefined;
  }> {
    mandatoryFieldsCheck(this, ["password", "email", "userName"]);
    const user = await userInstance.search({ email: this.email }, true);

    if (user) {
      return {
        status: false,
        msg: "bad Request",
        reason: "email already exists",
      };
    }
    return {
      status: true,
      msg: "success",
    };
  }
  hash(password: string) {
    this.salt = crypto.randomBytes(16).toString("hex");
    this.hashPassword = crypto
      .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
      .toString("hex");
  }
  async login(): Promise<{
    status: boolean;
    msg: string;
    reason?: string | undefined;
    role?: userType;
  }> {
    if (this.email && this.password) {
      let user = await userInstance.search({ email: this.email }, true);

      if (!user) {
        return {
          status: false,
          msg: "Not authorized",
          reason: "email or password are invalid ",
        };
      }

      user = user as User;

      this.userName = user.name;
      this.hashPassword = user.hashPassword;
      this.salt = user.salt;
      this.role = user.role || userType.user;

      const isPasswordValid = this.validatePassword();
      if (!isPasswordValid) {
        return {
          status: false,
          msg: "not authorized",
          reason: "email or password are invalid",
        };
      }
      return {
        status: true,
        role: user.role,
        msg: "success",
      };
    } else {
      return {
        status: false,
        msg: "bad request",
        reason: "email and password are required",
      };
    }
  }
  validatePassword(): boolean {
    if (this.password && this.salt) {
      const hash = crypto
        .pbkdf2Sync(this.password, this.salt, 10000, 512, "sha512")
        .toString("hex");
      return this.hashPassword === hash;
    }
    return false;
  }
  async register(): Promise<boolean> {
    if (this.password) {
      this.hash(this.password);

      await userInstance.save({
        salt: this.salt,
        hashPassword: this.hashPassword,
        email: this.email,
        name: this.userName,
      });

      return true;
    }
    return false;
  }

  generateJWT() {
    console.log({
      email: this.email,
      password: this.password,
      name: this.userName,
    });

    return jwt.sign(
      {
        name: this.userName,
        email: this.email,
        role: this.role,
      },
      JWT_SECRET,
      {
        expiresIn: JWT_EXPIRE,
      }
    );
  }
  toAuthToken(): {
    userName?: string;
    userEmail: string;
    token: string;
  } {
    return {
      token: this.generateJWT(),
      userName: this.userName,
      userEmail: this.email,
    };
  }

  //getters

  public get getRole() {
    return this.role;
  }
}

export default UserEntity;
