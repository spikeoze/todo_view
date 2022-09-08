const express = require("express");
const postRouter = express.Router();
const asyncHandler = require("express-async-handler");

const {
  getAllPosts,
  getSinglePost,
  createPost,
  deletePost,
} = require("../controller/posts");

const {
  validatorMiddleware,
  postValidator,
} = require("../middleware/schemaValidation");

const { isAuthorized } = require("../middleware/postMiddleware");

postRouter.get("/:username/posts", asyncHandler(getAllPosts));
postRouter.get("/:username/posts/:id", asyncHandler(getSinglePost));

postRouter.post(
  "/:username/posts",
  isAuthorized,
  validatorMiddleware(postValidator),
  asyncHandler(createPost)
);

postRouter.delete(
  "/:username/posts/:id",
  isAuthorized,
  asyncHandler(deletePost)
);

module.exports = postRouter;
