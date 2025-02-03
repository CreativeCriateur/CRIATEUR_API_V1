import * as jwt from "jsonwebtoken";
import { config } from "../config";

export const generateAccessToken = async (userId: string): Promise<any> => {
  try {
    const secret = await getSecretKey();
    return jwt.sign({ userId }, secret.ACCESS_TOKEN_SECRET, {
      algorithm: "HS512",
      expiresIn: "15m" // 15mins
    });
  } catch (error) {
    console.log(error);
  }
};

export const generateRefreshToken = async (userId: string) => {
  try {
    const secret = await getSecretKey();
    return jwt.sign({ userId }, secret.REFRESH_TOKEN_SECRET, {
      algorithm: "HS512",
      expiresIn: "7d" // 7days
    });
  } catch (error) {
    console.log(error);
  }
};

export const verifyAccessToken = async (token: string) => {
  const secret = await getSecretKey();
  return jwt.verify(token, secret.ACCESS_TOKEN_SECRET);
};

export const verifyRefreshToken = async (token: string) => {
  const secret = await getSecretKey();
  return jwt.verify(token, secret.REFRESH_TOKEN_SECRET);
};

const getSecretKey = async () => {
  const secretKey = {
    ACCESS_TOKEN_SECRET: config.accessTokenSecret,
    REFRESH_TOKEN_SECRET: config.refreshTokenSecret
  };
  return secretKey;
};
