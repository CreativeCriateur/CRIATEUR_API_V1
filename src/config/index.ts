import * as dotenv from "dotenv";
import * as joi from "joi";

process.env.ENV_PATH
  ? dotenv.config({ path: process.env.ENV_PATH })
  : dotenv.config();

const schema = joi
  .object({
    PORT: joi.number().required()
  })
  .unknown()
  .required();

const { error, value: envVars } = schema.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const config = {
  isDevelopment: envVars.NODE_ENV === "development" ? true : false,
  // isLocahost: envVars.NODE_ENV === 'development' ? true : false,
  isStaging: envVars.NODE_ENV === "staging" ? true : false,
  isTesting: envVars.NODE_ENV === "test" ? true : false,
  isProduction: envVars.NODE_ENV === "production" ? true : false,
  port: envVars.PORT,
  db: {
    port: envVars.PGPORT,
    host: envVars.PGHOST,
    username: envVars.PGUSERNAME,
    password: envVars.PGPASSWORD,
    name: envVars.PGDATABASE,
    logging: envVars.DATABASE_LOGGING
  }
};
