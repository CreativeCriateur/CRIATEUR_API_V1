import { Request, Response } from "express";
import { Op, Sequelize } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import db from "../models";
import { isValidPassword, isValidEmail, checkPassword } from "../utils/helpers";
import { Authentication } from "../utils/auth";
import { generateOtp } from "../utils/otps";

export const createUser = async (req: Request, res: Response): Promise<any> => {
  const { email, password, confirmPassword } = req.body;
  const data = req.body;
  let existEmail = null;

  if (!email && !password) {
    return res.status(400).json({
      message: "Please enter either/both email or password",
      status: false
    });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({
      message: "confirmPassword must be equal to Password",
      status: false
    });
  }
  if (email && !isValidEmail(email)) {
    return res.status(400).json({
      message: "Invalid email address supplied",
      status: false
    });
  }
  // check password is valid
  if (password && !isValidPassword(password)) {
    return res.status(400).json({
      message: "Password must be at least 5 characters with 1 uppercase",
      status: false
    });
  }
  // check if email already exist
  existEmail = await db.User.findOne({
    where: {
      email
    }
  });

  if (existEmail !== null)
    return res
      .status(400)
      .json({ message: "Email already exist", status: false });

  let isActive: boolean = false;
  if (data.googleId) {
    isActive = true;
  }

  try {
    const salt = Authentication.generateSalt();
    const passwordHash = Authentication.generatePasswordHash(
      password.trim(),
      salt
    );
    const newPassword = `${salt}.${passwordHash}`;
    const userDetails = {
      uuid: uuidv4(),
      email: email ? email.toLowerCase().trim() : null,
      password: newPassword,
      confirmPassword: newPassword,
      googleId: data.googleId,
      isNewUser: true,
      isDeleted: false,
      isActive,
      fullName: data.fullName
    };

    //insert data into the User.Create
    const dataUser = await db.User.create(userDetails);

    return dataUser;
  } catch (err: any) {
    return res.status(500).json({ message: err.message, status: false });
  }
};

export const list = async (req: Request, res: Response): Promise<any> => {
  const currentPage = req.body.currentPage || 0;
  const pageSize = req.body.pageSize || 10;
  const data = req.body;
  let query = await db.User.findAll({
    where: {
      isDeleted: false
    }
  });

  if (req.body.isActive) {
    query = query.andWhere("user.active = :type", { ...data });
  }

  // if (data.search) {
  //   const searchParam = decodeURIComponent(data.search.trim().toLowerCase());
  //   query = query.andWhere(
  //     '(user.firstname ILIKE :searchParam OR user.lastname ILIKE :searchParam OR user.email ILIKE :searchParam OR "user"."primaryPhone" ILIKE :searchParam OR "user"."secondaryPhone" ILIKE :searchParam)',
  //     { searchParam: `%${searchParam}%` },
  //   );
  // }

  const { rows, count } = await db.User.findAndCountAll({
    where: {
      isDeleted: false
    },
    limit: pageSize,
    offset: currentPage
  });

  return await res.status(200).json({
    rows,
    pagination: {
      count,
      currentPage,
      pageSize
    }
  });
};

export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<any> => {
  const users = await db.User.findAll({
    where: {
      isDeleted: false
    }
  });

  return res.status(200).json({ users });
};

export const getUserById = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params;
  const user = await db.User.findOne({
    where: { uuid: id, isDeleted: false }
  });

  if (!user) {
    return res
      .status(400)
      .json({ messge: "User with id does not exist", status: false });
  }

  const response = {
    ...user,
    passwordExist: user.password ? true : false,
    status: true
  };

  return res.status(200).json(response);
};

export const getUsersByIds = async (
  req: Request,
  res: Response
): Promise<any> => {
  const uuids = req.body.uuids as string[];
  const country = req.body.country as string;
  //const criteria: any = { id: In(ids), isDelete: false };
  //if (country) criteria.country = country;
  try {
    const users = await db.User.find({
      where: {
        uuid: {
          [Op.in]: uuids
        }
      }
    });

    return res.status(200).json({ users });
  } catch (err: any) {
    return await res
      .status(500)
      .json({ Error: `Error fetching users...${err.message}`, status: false });
  }
};

export const photoUpload = async (
  req: Request,
  res: Response
): Promise<any> => {
  return;
};

export const updateUser = async (req: Request, res: Response): Promise<any> => {
  const { uuid } = req.body;
  const data = req.body;
  let user = await db.User.findOne({
    where: {
      [Op.and]: [
        {
          uuid
        },
        {
          isDeleted: false
        }
      ]
    }
  });

  if (!user) {
    return res.status(400).json({ message: "User not found", status: false });
  }

  if (data.password) {
    if (user.password) {
      /* Checking if the new password is different from the old password. */
      const oldSalt = user.password.split(".")[0];
      const oldhashPassword = user.password.split(".")[1];

      if (
        Authentication.comparePassword(data.password, oldhashPassword, oldSalt)
      ) {
        throw new Error("New password must be different from old password");
      }
    }

    data.password = data.password.trim();
    const salt = Authentication.generateSalt();
    const password = Authentication.generatePasswordHash(data.password, salt);
    user.password = `${salt}.${password}`;
    user = await db.User.create(user);
  }

  user = Object.assign(user, data);

  try {
    await db.User.save(user);

    return await res.status(200).json({ user });
  } catch (err: any) {
    return await res
      .status(500)
      .json({ Error: "Error updating user " + err.message });
  }
};

export const deleteUserAccount = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { uuid, deleteReason } = req.body;
    const user = await db.User.findOne({
      where: { uuid, isDeleted: false }
    });
    if (!user) {
      return res
        .status(400)
        .json({ message: "user with the uuid does not exist", status: false });
    }
    const updateData = {
      isDeleted: true,
      deletedAt: new Date().toISOString(),
      deleteReason: deleteReason || user.deleteReason
    };
    const updatedUserAccount = await db.User.update(updateData, {
      where: {
        id: user.id
      }
    });

    return res.status(200).json({ success: true, updatedUserAccount });
  } catch (error: any) {
    return res.status(500).json({
      Error: `Error deleting user account: ${error.message}`,
      status: false
    });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;

  const condition = { email: email.toLowerCase().trim(), isDeleted: false };

  //let user: any;

  try {
    const user = await db.User.findOne({
      where: condition,
      include: {
        model: db.Role
      }
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found. Please sign up", status: false });
    }

    if (!user.isActive) {
      if (user.isNewUser) {
        throw new Error(
          "Email not verified, please check your email for verification link"
        );
      } else {
        throw new Error("User has been de-activated");
      }
    }

    let flag: boolean = false;

    if (user.password) {
      const salt = user.password.split(".")[0];
      const hashPassword = user.password.split(".")[1];

      flag = Authentication.comparePassword(password, hashPassword, salt);
    }

    if (!flag) {
      throw new Error("Invalid Password");
    }
    //let data: any = Object.assign({}, user);
    //console.log("user login", user);
    //data.passwordExist = true;

    return user;
  } catch (err: any) {
    return await res.status(500).json({ error: err.message, status: false });
  }
};

export const loginNoPassword = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { email, phone } = req.body;
  const isDeleted = false;
  const user = await db.User.findOne({
    where: Sequelize.literal(
      `(phone = '${phone.trim()}' OR email = '${email
        .trim()
        .toLowerCase()}') AND isDeleted = ${isDeleted}`
    )
  });

  if (!user) {
    throw new Error("this email/phone number does not belong to any user");
  }

  const otp = generateOtp();
  user.otp = otp;
  //user.otpExpiry = new Date();
  await db.User.create(user);
  //sendOtpToUser(user, otp);
  const response = {
    message:
      "the verification code has been sent to your email and/or phone number",
    userId: user.uuid,
    status: false
  };

  return await res.status(200).json(response);
};

export const verifyUserOTP = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { email, otp } = req.body;
  const user = await db.User.findOne({
    where: {
      email
    }
  });

  try {
    if (!user) {
      return res.status(400).json({ message: "User not found", status: false });
    }

    if (user.isActive) {
      return res
        .status(400)
        .json({ message: "User already verified", status: false });
    }

    if (user.otp !== otp || user.otpExpiry < new Date()) {
      return res
        .status(400)
        .json({ message: "Invaid or expired OTP", status: false });
    }

    user.isActive = true;
    user.isNewUser = false;
    user.otp = "";
    user.otpExpiry = undefined;

    //console.log("user bef", user);

    await user.save();
    //console.log("use data", user);

    return res.status(201).json({
      message: "Email verified successfully, you can now login",
      status: true
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message, status: false });
  }
};

export const generateNewUserOTP = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { email } = req.body;
  const user = await db.User.findOne({
    where: {
      email
    }
  });

  try {
    if (!user) {
      return res.status(400).json({ message: "User not found", status: false });
    }

    const otp = await generateOtp();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();
    //console.log("use data", user);

    // send otp to user email

    return res.status(201).json({
      message: "New Otp generated and send to user's email",
      otp,
      status: true
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message, status: false });
  }
};

export const updatePassword = async (req: Request, res: Response) => {
  const { password, uuid } = req.body;
  const isDeleted = false;
  const isActive = true;

  if (!password && !isValidPassword(password)) {
    throw new Error("Password must be at least 5 characters with 1 uppercase");
  }

  const user = await db.User.findOne({
    where: Sequelize.literal(
      `(uuid = '${uuid}') AND (isDeleted = ${isDeleted} AND isActive = ${isActive})`
    )
  });

  if (!user) {
    throw new Error("User not found. Please sign up");
  }

  /* Checking if the new password is different from the old password. */
  const oldSalt = user.password.split(".")[0];
  const oldhashPassword = user.password.split(".")[1];

  if (Authentication.comparePassword(password, oldhashPassword, oldSalt)) {
    throw new Error("New password must be different from old password");
  }

  password.trim();
  const salt = Authentication.generateSalt();
  const passwordHash = Authentication.generatePasswordHash(password, salt);
  const newPassword = `${salt}.${passwordHash}`;

  await db.User.create({ id: user.id, password: newPassword });

  return res
    .status(200)
    .json({ message: "Password Updated Successfully", user, status: true });
};

export const changePassword = async (req: Request, res: Response) => {
  const { oldPassword, newPassword, uuid } = req.body;
  const isDeleted = false;
  const isActive = true;

  if (!newPassword || !checkPassword(newPassword)) {
    throw new Error(
      "Password must be minimum five characters, at least one letter, one number and one special character"
    );
  }

  const user = await db.User.findOne({
    where: Sequelize.literal(
      `(uuid = '${uuid}') AND (isDeleted = ${isDeleted} AND isActive = ${isActive})`
    )
  });

  if (!user) {
    throw new Error("User not found. Please sign up");
  }

  if (user.password) {
    const oldSalt = user.password.split(".")[0];
    const oldhashPassword = user.password.split(".")[1];

    /* Checking if the correct old password was entered */
    if (
      !Authentication.comparePassword(oldPassword, oldhashPassword, oldSalt)
    ) {
      throw new Error("Incorrect old password");
    }

    /* Checking if the new password is different from the old password. */
    if (Authentication.comparePassword(newPassword, oldhashPassword, oldSalt)) {
      throw new Error("New password must be different from old password");
    }
  }

  newPassword.trim();
  const salt = Authentication.generateSalt();
  const passwordHash = Authentication.generatePasswordHash(newPassword, salt);
  const password = `${salt}.${passwordHash}`;

  await db.User.create({ id: user.id, password });

  return user;
};

export const getUserByAppleId = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { appleId } = req.body;
  const user = await db.User.findOne({
    where: [{ appleId }, { email: appleId }]
  });
  if (!user) {
    return false;
  }

  return user;
};

export const verifyEmail = async (
  req: Request,
  res: Response
): Promise<any> => {
  if (!isValidEmail(req.body.email)) {
    return res.status(400).json({
      status: false,
      message: "Invalid email supplied"
    });
  }

  const user = await db.User.findOne({
    where: { email: req.body.email, isDeleted: false }
  });
  if (user) {
    return await res.status(200).json({
      status: false,
      message: "Email already belongs to another user"
    });
  }

  return await res
    .status(200)
    .json({ status: true, message: "email is available and valid" });
};

export const verifyPhone = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { primaryPhone, secondaryPhone } = req.body;
  const user = await db.User.findOne({
    where: {
      [Op.and]: [
        { primaryPhone: primaryPhone, isDeleted: false },
        { secondaryPhone: secondaryPhone, isDeleted: false }
      ]
    }
  });

  if (user) {
    return await res.status(400).json({
      status: false,
      message: "Phone number already belongs to another user"
    });
  } else {
    return await res
      .status(200)
      .json({ status: true, message: "Phone number is available" });
  }
};

///// Account Profile

export const createAccountInfo = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { userId, phoneNumber, userName, organization, position, address } =
    req.body;
  const user = await db.User.findOne({
    where: { uuid: userId, isDeleted: false }
  });
  console.log("user ", user);

  if (!user) {
    return res.status(400).json({ message: "User not found", status: false });
  }

  try {
    const accountDetails = {
      userUuid: user.uuid,
      userName,
      phoneNumber,
      organization,
      position,
      address
    };
    const accountData = await db.AccountInfo.create(accountDetails);
    console.log("accountData ", accountData);
    return res
      .status(201)
      .json({ message: "Account Profile Added Successfully!", status: true });
  } catch (error: any) {
    return res.status(500).json({ message: error.message, status: false });
  }
};

export const getAllAccountProfile = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    console.log("inside getall profile");

    const profiles = await db.AccountInfo.findAll({
      where: { isDeleted: false },
      include: [
        {
          model: db.User,
          as: "user"
        }
      ]
    });

    console.log("profiles ", profiles);

    return res.status(200).json({ profiles, status: true });
  } catch (error: any) {
    return res.status(500).json({ message: error.message, status: false });
  }
};

export const getAccountProfileList = async (
  req: Request,
  res: Response
): Promise<any> => {
  const currentPage = req.body.currentPage || 0;
  const pageSize = req.body.pageSize || 10;
  const data = req.body;

  const { rows, count } = await db.AccountInfo.findAndCountAll({
    where: {
      isDeleted: false
    },
    include: [
      {
        model: db.User,
        as: "user"
      }
    ],
    limit: pageSize,
    offset: currentPage
  });

  return res.status(200).json({
    rows,
    pagination: {
      count,
      currentPage,
      pageSize
    }
  });
};

export const updateAccountInfo = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { userId, accountInfoId } = req.body;
  const data = req.body;
  let user = await db.User.findOne({
    where: {
      [Op.and]: [
        {
          uuid: userId
        },
        {
          isDeleted: false
        }
      ]
    }
  });

  let accountProfile = await db.AccountInfo.findOne({
    where: { id: accountInfoId }
  });

  if (!user) throw new Error("User id not found");

  if (data.password) {
    if (user.password) {
      /* Checking if the new password is different from the old password. */
      const oldSalt = user.password.split(".")[0];
      const oldhashPassword = user.password.split(".")[1];

      if (
        Authentication.comparePassword(data.password, oldhashPassword, oldSalt)
      ) {
        throw new Error("New password must be different from old password");
      }
    }

    data.password = data.password.trim();
    const salt = Authentication.generateSalt();
    const password = Authentication.generatePasswordHash(data.password, salt);
    user.password = `${salt}.${password}`;
    user = await db.User.create(user);
  }

  user = Object.assign(user, data);

  try {
    await db.User.create(user);

    return res.status(200).json({ user });
  } catch (err: any) {
    return res
      .status(500)
      .json({ Error: "Error updating user " + err.message });
  }
};
