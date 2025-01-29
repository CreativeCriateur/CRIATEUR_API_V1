import "reflect-metadata";
import express, { Express } from "express";
import { config } from "./config";
import path from "path";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import swaggerConfig from "./config/swaggerConfig";
import { corsHandlers } from "./middlewares/corsHandler";
import { routeNotFoundHandler } from "./middlewares/routeNotFoundHandler";
import routes from "./routes/index";
import db from "./models";
import bodyParser from "body-parser";
import { testSeeds } from "./seeders/test";

const PORT = config.port || 3400;

export const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(corsHandlers);

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "..", "templates")));

// Generate Swagger docs
const swaggerDocs = swaggerJsdoc(swaggerConfig);

// Serve Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/api", routes);

const createTest = () => {
  testSeeds.map((data) => {
    db.Test.create(data);
  });
};

//createTest();

app.use(routeNotFoundHandler);

// synchronice models
function main() {
  db.sequelize.sync().then(() => {
    try {
      app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
        console.log(
          `Swagger docs available at http://localhost:${PORT}/api-docs`
        );
      });
    } catch (err: any) {
      console.error(`Error connecting to the database ${err.message}`);
    }
  });
}

main();

//console.log(db, "User ");
