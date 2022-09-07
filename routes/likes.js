const express = require("express");
const likesRouter = express.Router();
const asyncHandler = require("express-async-handler");

const {
  singlePostLikes,
  likePost,
  unlikePost,
} = require("../controller/likes");

likesRouter.get("/:id/likes", asyncHandler(singlePostLikes));

likesRouter.post("/:id/likes", asyncHandler(likePost));

likesRouter.delete("/:id/likes", asyncHandler(unlikePost));

module.exports = likesRouter;
