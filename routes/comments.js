const express = require("express");
const commentsRouter = express.Router();
const asyncHandler = require("express-async-handler");

const {
  createComment,
  deleteComment,
  getComments,
} = require("../controller/comments");

commentsRouter.post("/:id/comment", asyncHandler(createComment));
commentsRouter.get("/:id/comment", asyncHandler(getComments));
commentsRouter.delete("/:id/comment/:commentId", asyncHandler(deleteComment));

module.exports = commentsRouter;
