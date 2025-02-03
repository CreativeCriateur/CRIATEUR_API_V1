import { Request, Response } from "express";
import * as crypto from "crypto";

export const generateOtp = async () => {
  // crypto.randomInt(100000, 999999).toString();
  return Math.floor(Math.random() * (999999 - 111111) + 111111).toString();
};
