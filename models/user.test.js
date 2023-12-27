const db = require("../db");
const { BadRequestError, UnauthorizedError } = require("../utils/errors");
const User = require("./user");
const {
  commonAfterAll,
  commonAfterEach,
  commonBeforeAll,
  commonBeforeEach,
} = require("../tests/common");

beforeAll(commonBeforeAll);
afterAll(commonAfterAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);

const newUser = {
  username: "fake_user",
  email: "fake@user.com",
  isAdmin: false,
};

describe("User", () => {
  describe("Test user registration", () => {
    test("user can succesfully register with proper credentials", async () => {
      const user = await User.register({ ...newUser, password: "pw" });
      expect(user).toEqual({
        id: expect.any(Number),
        username: newUser.username,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        createdAt: expect.any(Date),
      });
    });

    test("Register with duplicate email throws error", async () => {
      expect.assertions(1);

      try {
        await User.register({ ...newUser, password: "pw" });
        await User.register({
          ...newUser,
          username: "something_else",
          password: "pw",
        });
      } catch (error) {
        expect(error instanceof BadRequestError).toBeTruthy();
      }
    });

    test("Register with duplicate username throws error", async () => {
      expect.assertions(1);

      try {
        await User.register({ ...newUser, password: "pw" });
        await User.register({
          ...newUser,
          email: "something@else.io",
          password: "pw",
        });
      } catch (error) {
        expect(error instanceof BadRequestError).toBeTruthy();
      }
    });
  });
});

afterAll(async () => {
  await db.end();
});
