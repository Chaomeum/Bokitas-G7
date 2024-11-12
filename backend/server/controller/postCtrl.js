const Post = require("../models/postModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const validateMongoDB = require("../utils/validateMongoDB");

const createPost = asyncHandler(async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.json({ status: "success", post });
  } catch (error) {
    res.status(500);
    throw new Error("Error al crear el post");
  }
});

const getPost = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("likes")
      .populate("dislikes");
    if (post) {
      await Post.findByIdAndUpdate(
        req.params.id,
        { $inc: { numVistas: 1 } },
        { new: true }
      );
      res.json(post);
    } else {
      res.status(404);
      throw new Error("No se pudo encontrar el post");
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener el post", error: error.message });
  }
});

const getAllPosts = asyncHandler(async (req, res) => {
  try {
    const posts = await Post.find({});
    res.json(posts);
  } catch (error) {
    res.status(500);
    throw new Error("Error al obtener los posts");
  }
});

const updatePost = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.json(updatedPost);
    } else {
      res.status(404);
      throw new Error("No se pudo encontrar el post");
    }
  } catch (error) {
    res.status(500);
    throw new Error("Error al actualizar el post");
  }
});

const likePost = asyncHandler(async (req, res) => {
  try {
    const { postID } = req.body;
    validateMongoDB(postID);

    // Find the post
    const post = await Post.findById(postID);
    if (!post) {
      res.status(404);
      throw new Error("Post no encontrado");
    }

    // Find the user
    const loginUserID = req.user._id.toString();

    // Check if the user has already liked or disliked the post
    const alreadyLiked = post.likes.includes(loginUserID);
    const alreadyDisliked = post.dislikes.includes(loginUserID);

    let update = {};

    if (alreadyLiked) {
      // If the user has already liked the post, remove the like
      update = { $pull: { likes: loginUserID }, isLiked: false };
    } else {
      // If the user has already disliked the post, remove the dislike
      if (alreadyDisliked) {
        update.$pull = { dislikes: loginUserID };
        update.isDisliked = false;
      }
      // Add the like
      update.$push = { likes: loginUserID };
      update.isLiked = true;
    }

    const updatedPost = await Post.findByIdAndUpdate(postID, update, {
      new: true,
    });
    res.json({
      message: "Se agrego el like en el post con éxito",
      post: updatedPost,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al dar like al post", error: error.message });
  }
});

const dislikePost = asyncHandler(async (req, res) => {
  try {
    const { postID } = req.body;
    validateMongoDB(postID);

    // Buscar el post
    const post = await Post.findById(postID);
    if (!post) {
      res.status(404);
      throw new Error("Post no encontrado");
    }

    // Obtener el ID del usuario logueado
    const loginUserID = req.user._id.toString();

    // Verificar si el usuario ya ha dado dislike o like al post
    const alreadyDisliked = post.dislikes.includes(loginUserID);
    const alreadyLiked = post.likes.includes(loginUserID);

    let update = {};

    if (alreadyDisliked) {
      // Si el usuario ya ha dado dislike, eliminarlo
      update = { $pull: { dislikes: loginUserID }, isDisliked: false };
    } else {
      // Si el usuario ha dado like, eliminar el like
      if (alreadyLiked) {
        update.$pull = { likes: loginUserID };
        update.isLiked = false;
      }
      // Añadir el dislike
      update.$push = { dislikes: loginUserID };
      update.isDisliked = true;
    }

    const updatedPost = await Post.findByIdAndUpdate(postID, update, {
      new: true,
    });
    res.json({
      message: "Se agrego el dislike en el post con éxito",
      post: updatedPost,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al dar dislike al post", error: error.message });
  }
});

const deletePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deletePost = await Post.findByIdAndDelete(id);
    res.json(deletePost);
  } catch (error) {
    res.status(404);
    throw new Error("Post no encontrado");
  }
});

module.exports = {
  createPost,
  getPost,
  getAllPosts,
  updatePost,
  likePost,
  dislikePost,
  deletePost,
};
