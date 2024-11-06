const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema para las reseñas
const reviewSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  postedAt: { type: Date, default: Date.now },
});

// Schema principal del producto
const productSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    descripcion: {
      type: String,
      required: true,
    },
    precio: {
      type: Number,
      required: true,
      min: 0,
    },
    es_oferta: {
      type: Boolean,
      default: false,
    },
    precio_oferta: {
      type: Number,
      min: 0,
      validate: {
        validator: function (value) {
          return !this.isOferta || value < this.precio;
        },
        message: "El precio de oferta debe ser menor al precio regular",
      },
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      validate: {
        validator: Number.isInteger,
        message: "{VALUE} no es un número entero",
      },
    },
    vendidos: {
      type: Number,
      default: 0,
      min: 0,
      validate: {
        validator: Number.isInteger,
        message: "{VALUE} no es un número entero",
      },
    },
    categorias: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
    imagenes: [
      {
        url: { type: String, required: true },
        alt: { type: String },
        isPrincipal: { type: Boolean, default: false },
      },
    ],
    reviews: [reviewSchema],
    rating_promedio: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    numero_reviews: {
      type: Number,
      default: 0,
    },
    caracteristicas: [
      {
        nombre: { type: String },
        valor: { type: String },
      },
    ],
    estado: {
      type: String,
      enum: ["activo", "inactivo", "agotado"],
      default: "activo",
    },
  },
  {
    timestamps: true,
  }
);

// Índices para mejorar el rendimiento de búsquedas comunes
productSchema.index({ nombre: "text", descripcion: "text" });
productSchema.index({ slug: 1 });
productSchema.index({ categorias: 1 });

// Middleware para actualizar el rating promedio
productSchema.pre("save", function (next) {
  if (this.reviews.length > 0) {
    this.rating_promedio =
      this.reviews.reduce((acc, review) => acc + review.rating, 0) /
      this.reviews.length;
    this.numero_reviews = this.reviews.length;
  }
  next();
});

module.exports = mongoose.model("Product", productSchema);
