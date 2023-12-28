const request = require("supertest");
const app = require("../app");
const tokens = require("../utils/tokens");
const {
  commonAfterAll,
  commonAfterEach,
  commonBeforeAll,
  commonBeforeEach,
} = require("../tests/common");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

const themToken = tokens.createUserJwt({ username: "them", isAdmin: false });

describe("Auth Routes", () => {
  describe("GET /auth/me", () => {
    test("should receives their profile when hitting the endpoint", async () => {
      const res = await request(app)
        .get(`/auth/me`)
        .set("Authorization", `Bearer ${themToken}`);

      expect(res.body.user).toEqual({
        id: expect.any(Number),
        username: "them",
        email: "them@them.us",
        createdAt: expect.any(String),
        isAdmin: false,
      });
    });
    test("should throw a 401 error", async () => {
      const res = await request(app).get("/auth/me");

      expect(res.statusCode).toEqual(401);
    });
  });
});
