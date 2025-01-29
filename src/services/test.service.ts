import { Request, Response } from "express";
import db from "../models";
import { isValidEmail, isValidPassword } from "../utils/helpers";
import { v4 as uuidv4 } from "uuid";
import { Authentication } from "../utils/auth";

export const getTestData = async (
  req: Request,
  res: Response
): Promise<any> => {
  const data = await db.Test.findAll();
  return await res.status(200).json({
    success: true,
    data: data
  });
};

export const createTest = async (req: Request, res: Response): Promise<any> => {
  const { firstName, lastName, email, password } = req.body;
  let existUsername = null;
  if (!email && !password)
    return await res
      .status(400)
      .json({ message: "email and password are required", success: false });

  if (email && !isValidEmail(email)) {
    return await res.status(400).json({
      message: "Invalid email address supplied",
      success: false
    });
  }
  // check password is valid
  if (password && !isValidPassword(password)) {
    return await res.status(400).json({
      message: "Password must be at least 5 characters with 1 uppercase",
      success: false
    });
  }
  // check if username already exist
  existUsername = await db.Test.findAll({
    where: {
      email
    }
  });
  console.log(existUsername, " existUsername");
  if (existUsername.length > 0)
    return await res
      .status(400)
      .json({ message: "email already exist", success: false });

  try {
    const salt = Authentication.generateSalt();
    const passwordHash = Authentication.generatePasswordHash(
      password.trim(),
      salt
    );
    const newPassword = `${salt}.${passwordHash}`;
    const userDetails = {
      firstName,
      lastName,
      email,
      password: newPassword
    };

    //insert data into the db.Test.Create
    await db.Test.create(userDetails);
    //delete userDetails.password;
    return await res.status(201).json({
      message: "New Test User registered successfully",
      success: true
    });
  } catch (err: any) {
    return await res.status(500).json({ message: err.message });
  }
};
