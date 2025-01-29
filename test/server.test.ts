import request from "supertest";
import { app } from "../src/server";

describe("Our Application ", () => {
  // afterAll((done) => {
  //   console.log(`shutdown test done ${done}`);
  // });

  it("Starts and has the proper test environment", async () => {
    expect(process.env.NODE_ENV).toBe("test");
    expect(app).toBeDefined();
  }, 10000);

  it("Returns all options allowed to be called by customers (http method) ", async () => {
    const response = await request(app).options("/");
    expect(response.status).toBe(200);
    expect(response.headers["access-control-allow-methods"]).toBe(
      "PUT, GET, POST, PATCH, DELETE"
    );
  });
});
