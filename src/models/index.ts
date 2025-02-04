"use strict";

import { Sequelize } from "sequelize";
import Booking from "./booking";
import Payment from "./payment";
import Post from "./post";
import Project from "./project";
import Service from "./service";
import AccountInfo from "./accountinfo";
import WaitList from "./waitlist";
import User from "./user";
import Resource from "./resource";
import Role from "./role";
import Permission from "./permission";
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];

let sequelize: any;
if (config.use_env_variable) {
  sequelize = new Sequelize(
    process.env[config.use_env_variable] as string,
    config
  );
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

const db: any = {
  sequelize,
  AccountInfo,
  User,
  WaitList,
  Resource,
  Permission,
  Role,
  // Booking,
  // Payment,
  // Post,
  // Project,
  Service
  //
  // ,
  //
};

AccountInfo.initModel(sequelize);
User.initModel(sequelize);
WaitList.initModel(sequelize);
// Booking.initModel(sequelize);
// Payment.initModel(sequelize);
// Post.initModel(sequelize);
// Project.initModel(sequelize);
Service.initModel(sequelize);
Resource.initModel(sequelize);
Role.initModel(sequelize);
Permission.initModel(sequelize);

Object.values(db).forEach((modelName: any) => {
  if (modelName.associate) {
    modelName.associate(db);
  }
});

export { sequelize };
export default db;
