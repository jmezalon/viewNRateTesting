const db = require("../db");
const { BadRequestError, UnauthorizedError } = require("../utils/errors");
const Post = require("./post");
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

const newPost = {
  caption: "test caption",
  imageUrl: "test",
};

describe("Post", () => {
  describe("user can successfully create a post", () => {
    test("should receive a 201 status code after creating a post", async () => {
      const post = await Post.createNewPost({
        user: {
          id: 2,
          username: "them",
          email: "them@them.us",
          isAdmin: false,
        },
        post: newPost,
      });
      expect(post).toEqual({
        id: expect.any(Number),
        caption: newPost.caption,
        imageUrl: newPost.imageUrl,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        username: "them",
        userId: 2,
      });
    });
  });
});
