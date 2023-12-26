const request = require("supertest");
const app = require("./app");
const db = require("./db");

describe("Test application", () => {
  test("Not found for stie 404", async () => {
    const res = await request(app).get("/wrong-endpoint");
    expect(res.statusCode).toEqual(404);
  });

  test("Health check route returns valid response", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ health: "good" });
  });
});

afterAll(async () => {
  await db.end();
});
