const user = require("../models/userModel");
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
    throw new Error("User already exists");
  }
});

// Login a user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const findUser = await user.findOne({ email: email });

  if (findUser && (await findUser.matchPassword(password))) {
    // Generar token y refresh token
    const refreshToken = await generateRefreshToken(findUser._id);
    const updatedUser = await user.findByIdAndUpdate(
      findUser._id,
      { refreshToken: refreshToken },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
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
    throw new Error("Invalid email or password");
  }
});

// Refresh token
const handleRefreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) {
    res.status(401);
    throw new Error("No refresh token found");
  }
  const refreshToken = cookie.refreshToken;
  const userWithToken = await user.findOne({ refreshToken });
  if (!userWithToken) {
    res.status(401);
    throw new Error("1 Invalid refresh token");
  }
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err || userWithToken.id !== decoded.id) {
      res.status(401);
      throw new Error("2 Invalid refresh token");
    }
    const accessToken = generateToken(userWithToken?._id);
    res.json({ accessToken });
  });
});

// Logout a user
const logoutUser = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) {
    res.status(401);
    throw new Error("No refresh token found");
  }
  const refreshToken = cookie.refreshToken;
  const userWithToken = await user.findOne({ refreshToken });
  if (!userWithToken) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return res.sendStatus(204); // forbidden
  }
  await user.findOneAndUpdate({ refreshToken }, { refreshToken: "" });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  res.sendStatus(204);
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
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error updating user:", error);
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
    throw new Error("User not found");
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
    throw new Error("User not found");
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
    throw new Error("User not found");
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
    throw new Error("User not found");
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
};
