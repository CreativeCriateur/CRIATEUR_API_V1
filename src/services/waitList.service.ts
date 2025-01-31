import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { Op, Sequelize } from "sequelize";
import db from "../models";
import { isValidEmail } from "../utils/helpers";

export const createWaitList = async (
  req: Request,
  res: Response
): Promise<any> => {
  console.log(req.body, " inside the register service");
  const { email } = req.body;
  const data = req.body;
  let existEmail = null;

  if (!email) {
    return await res.status(400).json({
      message: "Please enter email ",
      success: false
    });
  }
  if (email && !isValidEmail(email)) {
    return await res.status(400).json({
      message: "Invalid email address supplied",
      success: false
    });
  }

  // check if email already exist
  existEmail = await db.User.findAll({
    where: {
      email
    }
  });

  if (existEmail.length > 0)
    return await res
      .status(400)
      .json({ message: "Email already exist", success: false });

  let isActive: boolean = false;
  if (data.googleId) {
    isActive = true;
  }

  try {
    const waitListDetails = {
      uuid: uuidv4(),
      fullName: data.fullName,
      email: email ? email.toLowerCase().trim() : null,
      businessType: data.businessType,
      title: data.title
    };

    //insert data into the User.Create
    const dataUser = await db.WaitList.create(waitListDetails);
    //delete userDetails.password;
    return await res.status(201).json({
      message: "New WaitlList registered successfully",
      data: dataUser,
      success: true
    });
  } catch (err: any) {
    return await res.status(500).json({ message: err.message });
  }
};

export const list = async (req: Request, res: Response): Promise<any> => {
  const currentPage = req.body.currentPage || 1;
  const pageSize = req.body.pageSize || 10;
  const { uuid } = req.body;
  const data = req.body;

  let query = await db.WaitList.findAll({
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

  const [result, total] = await query.getManyAndCount();

  return await res.status(200).json({
    result,
    pagination: {
      total,
      currentPage,
      pageSize
    }
  });
};
