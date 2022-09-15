const express = require("express");
const userRouter = express.Router();
const asyncHandler = require("express-async-handler");

const passport = require("passport");
const {
  registerController,
  loginController,
  currentUserController,
  logoutController,
  getUser,
} = require("../controller/user");
const {
  registerValidator,
  validatorMiddleware,
  loginValidator,
} = require("../middleware/schemaValidation");

userRouter.post(
  "/register",
  validatorMiddleware(registerValidator),
  asyncHandler(registerController)
);

userRouter.post(
  "/login",
  validatorMiddleware(loginValidator),
  passport.authenticate("local"),
  asyncHandler(loginController)
);

userRouter.get("/logout", asyncHandler(logoutController));

userRouter.get("/currentUser", asyncHandler(currentUserController));
userRouter.get("/:username", asyncHandler(getUser));

module.exports = userRouter;
