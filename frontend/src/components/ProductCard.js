import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Rating } from "@smastrom/react-rating";

const ProductCard = ({ product }) => {
  const [rating, setRating] = useState(0);
  if (!product) {
    return null; // O muestra un mensaje de error
  }
  return (
    <div className="col-3">
      <Link
        to={`/products/${product._id}`} // Enlaza al producto específico usando su slug
        className="product-card position-relative"
      >
        <div className="wishlist-icon position-absolute">
          <img src="images/fav.svg" alt="wishlist" />
        </div>
        <div className="product-image">
          <img
            src="images/pinguicula-em.jpg"
            className="img-fluid"
            alt="product"
          />
        </div>
        <div className="product-details">
          <h6 className="category">
            {product.categorias?.[0] || "Sin categoría"}
          </h6>
          <h5 className="title">{product.nombre}</h5>
          <p className="price">
            {product.es_oferta ? (
              <>
                <span className="text-danger">S/. {product.precio_oferta}</span>
                <span className="text-muted text-decoration-line-through ms-2">
                  S/. {product.precio}
                </span>
              </>
            ) : (
              `S/. ${product.precio}`
            )}
          </p>
          <Rating
            className="product-rating mb-2"
            value={product.rating_promedio || 0}
            onChange={setRating}
          />
        </div>
        <div className="action-bar position-absolute">
          <div className="d-flex flex-column g-15">
          <Link to={`/products/${product._id}`}>
              <img src="images/view.svg" alt="view" />
            </Link>
            <Link>
              <img src="images/cart.svg" alt="addcart" />
            </Link>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
