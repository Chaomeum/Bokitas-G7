import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Rating } from "@smastrom/react-rating";

const ProductCard = () => {
  const [rating, setRating] = useState(0);
  return (
    <div className="col-3">
      <Link to="/products/:id" className="product-card position-relative">
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
          <h6 className="category">Oferta del mes</h6>
          <h5 className="title">Pinguicula Emarginata</h5>
          <p className="price">S/. 75.00</p>
          <Rating
            className="product-rating mb-2"
            value={rating}
            onChange={setRating}
          />
        </div>
        <div className="action-bar position-absolute">
          <div className="d-flex flex-column g-15">
            <Link>
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
