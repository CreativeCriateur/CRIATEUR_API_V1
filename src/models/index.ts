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
// const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];

let sequelize: any;
if (config.use_env_variable) {
  sequelize = new Sequelize(
    process.env[config.use_env_variable] as string,
    config
  );
  // console.log(sequelize, " sequelize");
} else {
  console.log("inside the else");
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
  console.log(sequelize, " sequelize");
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

// fs.readdirSync(__dirname)
//   .filter((file: string) => {
//     return (
//       file.indexOf(".") !== 0 &&
//       file !== basename &&
//       file.slice(-3) === ".ts" &&
//       file.indexOf(".test.ts") === -1
//     );
//   })
//   .forEach((file: string) => {
//     const modelModule = require(path.join(__dirname, file));
//     console.log(modelModule, "check if exists oooh"); // Debugging
//     if (typeof modelModule === "function") {
//       const model = modelModule(sequelize, Sequelize.DataTypes);
//       db[model.name] = model;
//     }
//   });

Object.values(db).forEach((modelName: any) => {
  if (modelName.associate) {
    modelName.associate(db);
  }
});

export { sequelize };
export default db;
