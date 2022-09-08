const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/** @type {import("express").RequestHandler} */

// takes current user id and adds it to the user to be followed, followers field
const followUser = async (req, res) => {
  const { id } = req.user; // is follower
  const { username } = req.params; // is going to be followed

  const follower = parseInt(id);

  const findUserToFollow = await prisma.users.findUnique({
    where: { username: username },
  });
  if (!findUserToFollow) {
    res
      .status(400)
      .json({ message: `the user you are trying to follow does not exist` });
  } else {
    const userToFollow = parseInt(findUserToFollow.id);

    if (follower === userToFollow) {
      res.status(400).json({ message: "can't follow yourself" });
    } else {
      const followUser = await prisma.user_Followers.create({
        data: {
          user_id: userToFollow,
          follower_id: follower,
        },
      });

      res.status(200).json({
        message: `successfully followed user ${userToFollow}`,
        followUser,
      });
    }
  }
};

// get followers and follower of user (reusable with any user)
const getAllFollowers = async (req, res) => {
  const { username } = req.params;

  const getFollowersAndFollowings = await prisma.users.findUnique({
    where: { username: username },
    select: {
      id: true,
      username: true,
      followers: true,
      following: true,
    },
  });

  getFollowersAndFollowings
    ? res.status(200).json(getFollowersAndFollowings)
    : res.status(400).json({ message: "no such user exits" });
};

//Todo: works but refactor this function
// does the opposite of the followUser function
const unFollowUser = async (req, res) => {
  const { id } = req.user; // is follower
  const { username } = req.params; // is going to be unfollowed
  const followerId = parseInt(id);

  const findUserToUnFollow = await prisma.users.findUnique({
    where: { username: username },
  });

  if (!findUserToUnFollow) {
    res
      .status(400)
      .json({ message: `the user you are trying to unfollow does not exist` });
  } else {
    const userToUnFollowId = parseInt(findUserToUnFollow.id);
    if (userToUnFollowId === followerId) {
      res.status(400).json({ message: "can't unfollow yourself" });
    } else {
      const followId = await prisma.user_Followers.findFirst({
        where: { user_id: userToUnFollowId, follower_id: followerId },
      });

      if (!followId) {
        res
          .status(400)
          .json({ message: "can't unfollow user you are not followed to" });
      } else {
        const unfollow = await prisma.user_Followers.delete({
          where: { id: followId.id },
        });

        res.status(200).json({
          message: `successfully unfollowed user ${userToUnFollowId}`,
        });
      }
    }
  }
};

module.exports = {
  followUser,
  getAllFollowers,
  unFollowUser,
};
