const express = require("express");
const router = express.Router();
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { 
    createCategory, 
    getAllCategories,
    getCategory,
    updateCategory,
} = require("../controller/categoryCtrl");

router.post("/", authMiddleware, isAdmin, createCategory);
router.get("/", getAllCategories);
router.get("/:id", getCategory);
router.put("/:id", authMiddleware, isAdmin, updateCategory);

module.exports = router;