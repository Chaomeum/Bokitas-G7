const Product = require("../models/productModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

const createProduct = asyncHandler(async (req, res) => {
  try {
    if (req.body.nombre) {
      req.body.slug = slugify(req.body.nombre, { lower: true });
    }
    const newProduct = await Product.create(req.body);
    res.json(newProduct);
  } catch (error) {
    res.status(500);
    throw new Error("Product could not be created");
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      if (req.body.nombre) {
        req.body.slug = slugify(req.body.nombre, { lower: true });
      }
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
      res.json(updatedProduct);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    res.status(500);
    throw new Error("Product could not be updated");
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deleteProduct = await Product.findByIdAndDelete(id);
    res.json(deleteProduct);
  } catch (error) {
    res.status(404);
    throw new Error("Product not found");
  }
});

const getAProduct = asyncHandler(async (req, res) => {
  try {
    const findProduct = await Product.findById(req.params.id);
    res.json(findProduct);
  } catch (error) {
    res.status(404);
    throw new Error("Product not found");
  }
});

const getAllProducts = asyncHandler(async (req, res) => {
  try {
    // Filter products by category
    const queryObj = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    let query = Product.find(JSON.parse(queryStr));

    // Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // Field limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    // Pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    if (req.query.page) {
      const numProducts = await Product.countDocuments();
      if (skip >= numProducts) throw new Error("This page does not exist");
    }

    // Execute query
    const products = await query;

    res.status(200).json({
      status: "success",
      results: products.length,
      data: {
        products,
      },
    });
  } catch (error) {
    res.status(404);
    throw new Error("Products not found");
  }
});

const addToWishlist = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { productId } = req.body;

  try {
    const user = await User.findById(_id);
    if (!user) {
      res.status(404);
      throw new Error("Usuario no encontrado");
    }
    const alreadyAdded = user.wishList.includes(productId);
    let update = {};

    if (alreadyAdded) {
      update = { $pull: { wishList: productId } };
    } else {
      update = { $push: { wishList: productId } };
    }

    const updatedUser = await User.findByIdAndUpdate(_id, update, {
      new: true,
      runValidators: true,
    });

    res.json({
      message: "Lista de deseos actualizada con éxito",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "No se pudo actualizar la lista de deseos",
      error: error.message,
    });
  }
});

const addReview = asyncHandler(async (req, res) => {
  const { productId, user, email, rating, titulo, comment } = req.body; // Extraer campos enviados por el cliente

  try {
    const product = await Product.findById(productId);

    if (!product) {
      res.status(404).json({ message: "Producto no encontrado" });
      return;
    }

    // Crear la nueva reseña
    const newReview = {
      user, // Nombre del usuario
      email, // Correo del usuario
      rating, // Calificación
      titulo, // Título de la reseña
      comment, // Comentario de la reseña
    };

    product.reviews.push(newReview);

    // Actualizar estadísticas del producto
    product.numero_reviews = product.reviews.length;
    product.rating_promedio =
      product.reviews.reduce((acc, review) => acc + review.rating, 0) /
      product.numero_reviews;

    // Guardar los cambios
    await product.save();

    res.status(201).json({
      message: "Reseña añadida exitosamente",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al añadir la reseña",
      error: error.message,
    });
  }
});

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getAProduct,
  getAllProducts,
  addToWishlist,
  addReview,
};
