const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
/** @type {import("express").RequestHandler} */

const getAllPosts = async (req, res) => {
  const { username } = req.params;
  const user = await prisma.users.findUnique({
    where: { username: username },
  });
  const posts = await prisma.posts.findMany({
    where: { user_id: user.id },
    orderBy: { createdAt: "desc" },
    include: {
      author: {
        select: {
          id: true,
          username: true,
        },
      },
      Likes: true,
      Comments: true,
    },
  });

  res.status(200).json(posts);
};

/** @type {import("express").RequestHandler} */

const getSinglePost = async (req, res) => {
  const { username, id } = req.params;
  const user = await prisma.users.findUnique({
    where: { username: username },
  });

  const post = await prisma.posts.findFirst({
    where: { id: parseInt(id), user_id: user.id },
    include: {
      author: {
        select: {
          id: true,
          username: true,
        },
      },
      Likes: true,
      Comments: true,
    },
  });

  res.status(200).json(post);
};

/** @type {import("express").RequestHandler} */

const getCurrentUserFollowingsPosts = async (req, res) => {
  const { username } = req.params;

  var d = new Date();
  var xDaysAgo = d.setDate(d.getDate() - 5);

  const posts = await prisma.users.findUnique({
    where: { username },
    select: {
      Posts: {
        where: { createdAt: { gte: new Date(xDaysAgo) } },
        orderBy: { createdAt: "desc" },
        include: { Likes: true, Comments: true, author: true },
      },
      following: {
        select: {
          follower: {
            select: {
              id: true,
              Posts: {
                where: { createdAt: { gte: new Date(xDaysAgo) } },
                orderBy: { createdAt: "desc" },
                include: {
                  author: { select: { id: true, username: true } },
                  Likes: true,
                  Comments: true,
                },
              },
            },
          },
        },
      },
    },
  });

  const { Posts, following } = posts;

  const mappedPosts = following
    .map((user) => user.follower)
    .map((follower) => follower.Posts)
    .flat();

  res.status(200).json([...Posts, mappedPosts].flat());
};

/** @type {import("express").RequestHandler} */

const createPost = async (req, res) => {
  const { title, content } = req.body;
  const { username } = req.params;

  const user = await prisma.users.findUnique({
    where: { username: username },
  });

  const newPost = await prisma.posts.create({
    data: { title: title, content: content, user_id: user.id },
  });

  res.status(200).json({ message: "post made successfully", newPost });
};

/** @type {import("express").RequestHandler} */
const deletePost = async (req, res) => {
  const { username, id } = req.params;
  const user = await prisma.users.findUnique({
    where: { username: username },
    select: { id: true, username: true },
  });
  const deletePost = await prisma.posts.deleteMany({
    where: { id: parseInt(id), user_id: user.id },
  });

  res.status(200).json({ message: "Post deleted successfully" });
};

module.exports = {
  getAllPosts,
  getSinglePost,
  createPost,
  deletePost,
  getCurrentUserFollowingsPosts,
};
