const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

//* Controllers
const registerController = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body);

  const user = await prisma.users.findFirst({ where: { username } });

  if (!user) {
    const hashedPassword = await bcrypt.hash(password, 15);

    const newUser = await prisma.users.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    res.status(200).json({ message: "user successfully created" });
    console.log(newUser);
  } else {
    res.status(400).json("user with the same name already exists");
  }
};

const loginController = (req, res) => {
  res.status(200).json({ message: "successfully logged in" });
};

const logoutController = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    } else {
      res.status(200).json({ message: "successfully logged out" });
    }
  });
};

const currentUserController = (req, res) => {
  res.status(200).json({ user: req.user });
};

module.exports = {
  registerController,
  loginController,
  currentUserController,
  logoutController
};
