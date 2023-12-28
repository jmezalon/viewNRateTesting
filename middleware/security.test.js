const { UnauthorizedError } = require("../utils/errors");
const security = require("./security");

describe("Security", () => {
  describe("test requireAuthenticatedUser", () => {
    test("should not throw erros when user is permit", () => {
      expect.assertions(1);
      const req = {};
      const res = { locals: { user: { username: "lebron", isAdmin: false } } };
      const next = (err) => expect(err).toBeFalsy();
      security.requireAuthenticatedUser(req, res, next);
    });

    test("should throw an unauthorized error when no user is present", () => {
      expect.assertions(1);
      const req = {};
      const res = { locals: {} };
      const next = (err) =>
        expect(err instanceof UnauthorizedError).toBeTruthy();
      security.requireAuthenticatedUser(req, res, next);
    });
  });
});
