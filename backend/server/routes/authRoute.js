const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getUserById,
  blockUser,
  unblockUser,
  handleRefreshToken,
  logoutUser,
  updatePassword,
  getWishlist,
  userCart,
  getUserCart,
  emptyCart,
} = require("../controller/userCtrl");

const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/all-users", getAllUsers);
router.get("/refresh-token", handleRefreshToken);
router.get("/logout", logoutUser);
router.post("/cart", authMiddleware, userCart);
router.get("/cart", authMiddleware, getUserCart);
router.delete("/empty-cart", authMiddleware, emptyCart);
router.get("/wishlist", authMiddleware, getWishlist);
router.get("/:id", authMiddleware, isAdmin, getUserById);
router.delete("/:id", deleteUser);
router.put("/edit-user", authMiddleware, updateUser);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);
router.put("/update-password", authMiddleware, updatePassword);

module.exports = router;
