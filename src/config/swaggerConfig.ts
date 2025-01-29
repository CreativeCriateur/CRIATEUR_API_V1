import { config } from "./index";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API_V1",
      version: "1.0.0",
      description: "Criateurs_API documentation"
    },
    servers: [
      {
        url: `http://localhost:${config.port}` // Adjust according to your base URL
      }
    ]
  },
  apis: ["../routes/*.ts", "./dist/routes/*.js"] // Path to the API docs
};

export default swaggerOptions;
