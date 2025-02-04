import * as jwt from "jsonwebtoken";
import { config } from "../config";

export const generateAccessToken = async (
  userId: string,
  roles: string[]
): Promise<any> => {
  try {
    const secret = await getSecretKey();
    return jwt.sign(
      { userId: userId, roles: roles },
      secret.ACCESS_TOKEN_SECRET,
      {
        algorithm: "HS512",
        expiresIn: "1h" // 1hour
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const generateRefreshToken = async (userId: string, roles: string[]) => {
  try {
    const secret = await getSecretKey();
    return jwt.sign(
      { userId: userId, roles: roles },
      secret.REFRESH_TOKEN_SECRET,
      {
        algorithm: "HS512",
        expiresIn: "7d" // 7days
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const verifyAccessToken = async (token: string) => {
  const secret = await getSecretKey();
  return jwt.verify(token, secret.ACCESS_TOKEN_SECRET) as {
    userId: string;
    roles: string[];
  };
};

export const verifyRefreshToken = async (token: string) => {
  const secret = await getSecretKey();
  return jwt.verify(token, secret.REFRESH_TOKEN_SECRET) as {
    userId: string;
    roles: string[];
  };
};

const getSecretKey = async () => {
  const secretKey = {
    ACCESS_TOKEN_SECRET: config.accessTokenSecret,
    REFRESH_TOKEN_SECRET: config.refreshTokenSecret
  };
  return secretKey;
};
