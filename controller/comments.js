const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createComment = async (req, res) => {
  const userId = parseInt(req.user.id);
  const postId = parseInt(req.params.id);
  const { text } = req.body;

  const comment = await prisma.comments.create({
    data: {
      text,
      user_id: userId,
      post_id: postId,
    },
  });

  res.status(200).json({ message: "comment created successfully", comment });
};

const getComments = async (req, res) => {
  const postId = parseInt(req.params.id);

  const comments = await prisma.comments.findMany({
    where: { post_id: postId },
    include: { post: true },
  });

  res.status(200).json(comments);
};

// comment can be deleted by post author or comment author
//Todo: Find a better way to handle errors
const deleteComment = async (req, res) => {
  const userId = parseInt(req.user.id);
  const postId = parseInt(req.params.id);
  const commentId = parseInt(req.params.commentId);

  const deleteComment = await prisma.comments.deleteMany({
    where: {
      id: commentId,
      OR: [
        {
          post_id: postId,
          user_id: userId,
        },
        {
          post_id: postId,
          post: { author: { id: userId } },
        },
      ],
    },
  });
  res.status(200).json({ message: "comment deleted successfully" });
};

module.exports = { createComment, deleteComment, getComments };
