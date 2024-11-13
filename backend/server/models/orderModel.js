const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItems: [
      {
        nombre: { type: String, required: true },
        cantidad: { type: Number, required: true },
        imagen: { type: String, required: true },
        precio: { type: Number, required: true },
        producto: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
      },
    ],
    metodo_pago: {
      type: String,
      required: true,
    },
    metodo_pago_id: {
      type: String,
      required: true,
    },
    estado_entrega: {
      type: String,
      default: "Pendiente",
      enum: ["Pendiente", "Procesando", "Enviado", "Entregado", "Cancelado"],
      required: true,
    },
    total: {
      type: Number,
      required: true,
      default: 0.0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
