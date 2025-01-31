import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { Op, Sequelize } from "sequelize";
import db from "../models";
import { isValidEmail } from "../utils/helpers";

export const createWaitList = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { email } = req.body;
  const data = req.body;
  let existEmail = null;

  if (!email) {
    return await res.status(400).json({
      message: "Please enter email ",
      status: false
    });
  }
  if (email && !isValidEmail(email)) {
    return await res.status(400).json({
      message: "Invalid email address supplied",
      status: false
    });
  }

  // check if email already exist
  existEmail = await db.WaitList.findOne({
    where: {
      email
    }
  });

  if (existEmail !== null)
    return await res
      .status(400)
      .json({ message: "Email already exist", status: false });

  try {
    const waitListDetails = {
      uuid: uuidv4(),
      fullName: data.fullName,
      email: email ? email.toLowerCase().trim() : null,
      businessType: data.businessType,
      title: data.title,
      isDeleted: false
    };

    //insert data into the WaitList.Create
    const dataWaitList = await db.WaitList.create(waitListDetails);
    //delete userDetails.password;
    return await res.status(201).json({
      message: "New WaitList added successfully",
      data: dataWaitList,
      status: true
    });
  } catch (err: any) {
    return await res.status(500).json({ message: err.message, status: false });
  }
};

export const list = async (req: Request, res: Response): Promise<any> => {
  const currentPage = req.body.currentPage || 0;
  const pageSize = req.body.pageSize || 10;

  const { rows, count } = await db.WaitList.findAndCountAll({
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
