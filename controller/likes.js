const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/** @type {import("express").RequestHandler} */

// get likes of single post by id
const singlePostLikes = async (req, res) => {
  const { id } = req.params;
  const post_id = parseInt(id);

  const postLikes = await prisma.likes.findMany({ where: { post_id } });

  res.status(200).json({ message: "success", postLikes });
};

/** @type {import("express").RequestHandler} */
// like post by current user
const likePost = async (req, res) => {
  const userId = parseInt(req.user.id);
  const { id } = req.params;
  const postId = parseInt(id);

  const isPostLiked = await prisma.likes.findFirst({
    where: { post_id: postId, user_id: userId },
  });

  if (!isPostLiked) {
    const likePost = await prisma.likes.create({
      data: {
        user_id: userId,
        post_id: postId,
      },
    });

    res.status(200).json({ message: "post successfully liked", likePost });
  } else {
    res.status(400).json({ message: "post is already liked" });
  }
};

// look for liked post by post_id and user_id then delete the found like modal by its id
const unlikePost = async (req, res) => {
  const userId = parseInt(req.user.id);
  const { id } = req.params;
  const postId = parseInt(id);

  const likedPost = await prisma.likes.findFirst({
    where: { post_id: postId, user_id: userId },
  });

  if (likedPost) {
    const unlike = await prisma.likes.delete({
      where: { id: parseInt(likedPost.id) },
    });

    res.status(200).json({ message: "post unliked successfully" });
  } else {
    res
      .status(400)
      .json({ message: "can not unlike a post you have not liked" });
  }
};

module.exports = { singlePostLikes, likePost, unlikePost };
