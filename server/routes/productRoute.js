const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  addToWishlist,
  addReview,
} = require("../controller/productCtrl");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, isAdmin, createProduct);
router.post("/review/", authMiddleware, addReview);
router.get("/", getAllProducts);
router.get("/:id", getAProduct);
router.put("/wishlist/", authMiddleware, addToWishlist);
router.put("/:id", authMiddleware, isAdmin, updateProduct);
router.delete("/:id", authMiddleware, isAdmin, deleteProduct);

module.exports = router;
