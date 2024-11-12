const Category = require("../models/categoryModel");
const asyncHandler = require("express-async-handler");
const validateMongoDB = require("../utils/validateMongoDB");
const slugify = require("slugify");

const createCategory = asyncHandler(async (req, res) => {
  try {
    const { nombre, codigo, descripcion } = req.body;
    const category = await Category.create({
      nombre,
      slug: slugify(nombre, { lower: true }),
      codigo,
      descripcion,
    });
    res.json(category);
  } catch (error) {
    res.status(500);
    throw new Error("Error al crear la categoría");
  }
});

const getAllCategories = asyncHandler(async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500);
    throw new Error("Error al obtener las categorías");
  }
});

const getCategory = asyncHandler(async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (category) {
      res.json(category);
    } else {
      res.status(404);
      throw new Error("No se pudo encontrar la categoría");
    }
  } catch (error) {
    res.status(500);
    throw new Error("Error al obtener la categoría");
  }
});

const updateCategory = asyncHandler(async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (category) {
      const updatedCategory = await Category.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.json(updatedCategory);
    } else {
      res.status(404);
      throw new Error("No se pudo encontrar la categoría");
    }
  } catch (error) {
    res.status(500);
    throw new Error("Error al actualizar la categoría");
  }
});

module.exports = {
  createCategory,
  updateCategory,
  getAllCategories,
  getCategory,
};
