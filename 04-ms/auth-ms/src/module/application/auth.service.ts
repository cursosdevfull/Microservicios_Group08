import bcrypt from 'bcryptjs';
import jwt from 'jwt-simple';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

export default class AuthAppService {
  static generateRefreshToken(): string {
    return uuidv4();
  }

  static generateAccessToken(id: string, name: string): string {
    const payload = {
      id,
      name,
      iat: moment().unix(),
      exp: moment()
        .add(process.env.JWT_EXPIRES || 120, "seconds")
        .unix(),
    };

    return jwt.encode(payload, process.env.JWT_SECRET || "secret");
  }

  static async cipherPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  static async isMatchPassword(
    password: string,
    passwordHash: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, passwordHash);
  }

  static validateAccessToken(token: string) {
    return new Promise((resolve, reject) => {
      try {
        const payload = jwt.decode(token, process.env.JWT_SECRET || "secret");
        console.log("payload", payload);
        resolve(payload);
      } catch (error) {
        console.log(error);
        if (error.message === "Token expired") {
          reject({
            status: 409,
            message: "The token has expired",
          });
        } else {
          reject({
            status: 401,
            message: "Invalid token",
          });
        }
      }
    });
  }
}
