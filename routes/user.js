const express = require("express");
const userRouter = express.Router();
const passport = require("passport");
const {
  registerController,
  loginController,
  currentUserController,
  logoutController,
} = require("../controller/user");
const {
  registerValidator,
  validatorMiddleware,
  loginValidator,
} = require("../middleware/schemaValidation");

userRouter.post(
  "/register",
  validatorMiddleware(registerValidator),
  registerController
);

userRouter.post(
  "/login",
  validatorMiddleware(loginValidator),
  passport.authenticate("local"),
  loginController
);

userRouter.post("/logout", logoutController);

userRouter.get("/currentUser", currentUserController);

module.exports = userRouter;
