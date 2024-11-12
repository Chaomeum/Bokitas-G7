const express = require("express");
const router = express.Router();
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const {
  createPost,
  getPost,
  getAllPosts,
  updatePost,
  likePost,
  dislikePost,
  deletePost,
} = require("../controller/postCtrl");

router.post("/", authMiddleware, isAdmin, createPost);
router.put("/like", authMiddleware, likePost);
router.put("/dislike", authMiddleware, dislikePost);
router.get("/", getAllPosts);
router.get("/:id", getPost);
router.put("/:id", authMiddleware, isAdmin, updatePost);
router.delete("/:id", authMiddleware, isAdmin, deletePost);

module.exports = router;
