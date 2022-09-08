const express = require("express");
const followersRouter = express.Router();
const asyncHandler = require("express-async-handler");

const {
  followUser,
  getAllFollowers,
  unFollowUser,
} = require("../controller/followers");

followersRouter.post("/:username/follow", asyncHandler(followUser));
followersRouter.post("/:username/unfollow", asyncHandler(unFollowUser));
followersRouter.get("/:username/followers", asyncHandler(getAllFollowers));

module.exports = followersRouter;
