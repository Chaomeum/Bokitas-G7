const user = require("../models/userModel");
const Cart = require("../models/cartModel");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken");
const { generateRefreshToken } = require("../config/refreshToken");
const validateMongoDB = require("../utils/validateMongoDB");
const jwt = require("jsonwebtoken");

// Create a new user (Register)
const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const findUser = await user.findOne({ email: email });

  if (!findUser) {
    const newUser = await user.create(req.body);
    res.status(201).json(newUser);
  } else {
    throw new Error("El usuario ya existe");
  }
});

// Login a user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const findUser = await user.findOne({ email: email });

  if (findUser && (await findUser.matchPassword(password))) {
    // Generar token y refresh token
    const refreshToken = generateRefreshToken(findUser._id);
    await user.findByIdAndUpdate(
      findUser._id,
      { refreshToken: refreshToken },
      { new: true }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Asegúrate de que sea seguro en producción
      sameSite: "strict",
      maxAge: 72 * 60 * 60 * 1000, // 3 days
    });

    res.status(200).json({
      _id: findUser._id,
      nombre: findUser.nombre,
      email: findUser.email,
      direccion: findUser.direccion,
      telefono: findUser.telefono,
      rol: findUser.rol,
      token: generateToken(findUser._id), // Ahora token contiene el valor generado
    });
  } else {
    res.status(401);
    throw new Error("Email o contraseña incorrectos");
  }
});

// Refresh token
const handleRefreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) {
    res.status(401);
    throw new Error("No se encontró el refresh token");
  }
  const refreshToken = cookie.refreshToken;
  const userWithToken = await user.findOne({ refreshToken });
  if (!userWithToken) {
    res.status(401);
    throw new Error("No se encontró el usuario con el refresh token");
  }
  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
    if (err || userWithToken._id.toString() !== decoded.id) {
      res.status(401);
      throw new Error("No se pudo verificar el refresh token");
    }
    const accessToken = generateToken(userWithToken._id);
    res.json({ accessToken });
  });
});

// Logout a user
const logoutUser = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) {
    res.status(401);
    throw new Error("No se encontró el refresh token");
  }
  const refreshToken = cookie.refreshToken;
  const userWithToken = await user.findOne({ refreshToken });
  if (!userWithToken) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Asegúrate de que sea seguro en producción
      sameSite: "strict",
    });
    return res.sendStatus(204); // No Content
  }
  await user.findOneAndUpdate({ refreshToken }, { refreshToken: "" });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Asegúrate de que sea seguro en producción
    sameSite: "strict",
  });
  res.sendStatus(204); // No Content
});

// Update a user
const updateUser = async (req, res) => {
  const { _id } = req.user;
  validateMongoDB(_id);
  try {
    const updatedUser = await user.findByIdAndUpdate(
      _id,
      {
        nombre: req?.body?.nombre,
        email: req?.body?.email,
        direccion: req?.body?.direccion,
        telefono: req?.body?.telefono,
        rol: req?.body?.rol,
      },
      { new: true } // Devuelve el documento actualizado y aplica validaciones
    );
    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a user
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDB(id);
  try {
    const deleteUser = await user.findByIdAndDelete(id);
    res.json(deleteUser);
  } catch (error) {
    res.status(404);
    throw new Error("Usuario no encontrado");
  }
});

// Get all users
const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const getUsers = await user.find();
    res.json(getUsers);
  } catch (error) {
    res.status(500);
    throw new Error("Server error");
  }
});

// Get a user by ID
const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDB(id);
  try {
    const getUser = await user.findById(id);
    res.json(getUser);
  } catch (error) {
    res.status(404);
    throw new Error("Usuario no encontrado");
  }
});

const blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDB(id);
  try {
    const blockUser = await user.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      { new: true }
    );
    res.json(blockUser);
  } catch (error) {
    res.status(404);
    throw new Error("Usuario no encontrado");
  }
});

const unblockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDB(id);
  try {
    const unblockUser = await user.findByIdAndUpdate(
      id,
      {
        isBlocked: false,
      },
      { new: true }
    );
    res.json(unblockUser);
  } catch (error) {
    res.status(404);
    throw new Error("Usuario no encontrado");
  }
});

const updatePassword = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { oldPassword, newPassword } = req.body;
  validateMongoDB(_id);
  const findUser = await user.findById(_id);
  if (findUser && (await findUser.matchPassword(oldPassword))) {
    findUser.password = newPassword;
    await findUser.save();
    res.json({ message: "Contraseña actualizada correctamente" });
  } else {
    res.status(401);
    throw new Error("Contraseña incorrecta");
  }
});

const getWishlist = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDB(_id);
  try {
    const findUser = await user.findById(_id).populate("wishList");
    res.json(findUser);
  } catch (error) {
    res.status(404);
    throw new Error("Usuario no encontrado");
  }
});

const userCart = asyncHandler(async (req, res) => {
  const { cart } = req.body;
  const { _id } = req.user;
  validateMongoDB(_id);
  try {
    let products = [];
    const findUser = await user.findById(_id);
    if (!findUser) {
      res.status(404);
      throw new Error("Usuario no encontrado");
    }

    // Revisar si el carrito ya existe
    let userCart = await Cart.findOne({ user: findUser._id });
    if (userCart) {
      // Actualizar el carrito existente
      userCart.cartItems = cart.map((item) => ({
        cantidad: item.cantidad,
        precio: item.precio,
        producto: item._id,
      }));
    } else {
      // Crear un nuevo carrito
      userCart = new Cart({
        user: findUser._id,
        cartItems: cart.map((item) => ({
          cantidad: item.cantidad,
          precio: item.precio,
          producto: item._id,
        })),
      });
    }

    // Calcular el total del carrito
    userCart.cartTotal = userCart.cartItems.reduce(
      (total, item) => total + item.precio * item.cantidad,
      0
    );

    await userCart.save();
    res.json({ message: "Carrito actualizado con éxito", cart: userCart });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al agregar al carrito", error: error.message });
  }
});

const getUserCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDB(_id);
  try {
    const findUser = await user.findById(_id);
    if (!findUser) {
      res.status(404);
      throw new Error("Usuario no encontrado");
    }
    const userCart = await Cart.findOne({ user: findUser._id }).populate(
      "cartItems.producto"
    );
    res.json(userCart);
  } catch (error) {
    res.status(500);
    throw new Error("Error al obtener el carrito");
  }
});

const emptyCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDB(_id);
  try {
    const findUser = await user.findById(_id);
    if (!findUser) {
      res.status(404);
      throw new Error("Usuario no encontrado");
    }

    const userCart = await Cart.findOneAndDelete({ user: findUser._id });
    if (!userCart) {
      res.status(404);
      throw new Error("Carrito no encontrado");
    }

    res.json({ message: "Carrito vaciado con éxito", cart: userCart });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al vaciar el carrito", error: error.message });
  }
});

// Export the functions
module.exports = {
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
};
