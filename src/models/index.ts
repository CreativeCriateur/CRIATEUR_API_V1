"use strict";

// const fs = require("fs");
// const path = require("path");
import { Sequelize } from "sequelize";
import Booking from "./booking";
import Payment from "./payment";
import Post from "./post";
import Project from "./project";
import Service from "./service";
import Test from "./test";
import User from "./user";
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
  Booking,
  Payment,
  Post,
  Project,
  Service,
  Test,
  User
};

Booking.initModel(sequelize);
Payment.initModel(sequelize);
Post.initModel(sequelize);
Project.initModel(sequelize);
Service.initModel(sequelize);
Test.initModel(sequelize);
User.initModel(sequelize);

Object.values(db).forEach((modelName: any) => {
  if (modelName.associate) {
    modelName.associate(db);
  }
});

export { sequelize };
export default db;
