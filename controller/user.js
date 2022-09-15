const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

//* Controllers

const getUser = async (req, res) => {
  const { username } = req.params;
  const user = await prisma.users.findUnique({
    where: { username },
    select: {
      id: true,
      username: true,
      bio: true,
      Posts: true,
      followers: true,
      following: true,
    },
  });
  res.status(200).json(user);
};

const registerController = async (req, res, next) => {
  const { username, email, password } = req.body;
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
    await req.login(newUser, (err) => {
      if (err) {
        return next(err);
      }
    });
    res.status(200).json({ message: "user successfully created" });
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

const currentUserController = async (req, res) => {
  if (req.user) {
    const user = await prisma.users.findUnique({
      where: { username: req.user.username },
      include: { followers: true, following: true, Posts: true },
    });
    res.status(200).json(user);
  }
};

module.exports = {
  registerController,
  loginController,
  currentUserController,
  logoutController,
  getUser
};
