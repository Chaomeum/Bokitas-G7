const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cartItems: [
      {   
        cantidad: { type: Number, required: true },
        precio: { type: Number, required: true },
        producto: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
      },
    ],
    cartTotal: {
      type: Number,
      default: 0.0,
    },
    totalDiscount: {
      type: Number,
      default: 0.0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
