import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Container from "../components/Container";
import { Rating } from "@smastrom/react-rating";
import { FaRegHeart } from "react-icons/fa";
import instance from "../utils/api";

const SingleProduct = () => {
  const { id } = useParams(); // Cambiado a 'id'
  const [product, setProduct] = useState(null);
  const [rating, setRating] = useState(0);
  const [orderedProducts] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [tituloReview, setTituloReview] = useState("");
  const [comentario, setComentario] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await instance.get(`/api/product/${id}`);
        setProduct(response.data);
        setRating(response.data.rating_promedio);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToWishlist = async () => {
    try {
      await instance.put(`/api/product/wishlist/`, { productId: id });
      alert("Producto agregado a la lista de deseos");
    } catch (error) {
      console.error("Error adding product to wishlist:", error);
      alert("Hubo un error al agregar a la lista de deseos.");
    }
  };

  const handleAddToCart = () => {
    try {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existingProduct = cart.find((item) => item.id === id);

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.push({ id, quantity });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      alert("Producto agregado al carrito");
    } catch (error) {
      console.error("Error adding product to cart:", error);
      alert("Hubo un error al agregar al carrito.");
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleReviewSubmit = async (e) => {
    e.preventDefault(); // Evita que el formulario recargue la página

    const reviewData = {
      user: nombre,
      email: email,
      rating: rating,
      titulo: tituloReview,
      comment: comentario,
      productId: id,
    };

    const token = localStorage.getItem("token"); // Recuperar el token

    if (!token) {
      alert("Necesitas estar autenticado para dejar una review.");
      return;
    }

    try {
      const response = await instance.post("/api/product/review", reviewData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("¡Gracias por tu review!");
      // Actualiza las reviews en pantalla después de enviarla
      setProduct((prevProduct) => ({
        ...prevProduct,
        reviews: [...prevProduct.reviews, response.data],
        numero_reviews: prevProduct.numero_reviews + 1,
      }));
    } catch (error) {
      console.error("Error enviando la review:", error);
      alert("Hubo un problema al enviar tu review.");
    }
  };

  return (
    <>
      <Container class1="main-product-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-6">
            <div className="product-image">
              <img src="images/droseracapensis.png" alt="Planta Carnívora" />
            </div>
          </div>
          <div className="col-6">
            <div className="product-details">
              <div className="border-bottom">
                <h3 className="product-title mb-2">{product.nombre}</h3>
              </div>
              <div className="border-bottom">
                <p className="product-price mt-2">
                  {product.es_oferta ? (
                    <>
                      <span className="original-price">
                        S/. {product.precio}
                      </span>
                      <span className="offer-price">
                        S/. {product.precio_oferta}
                      </span>
                    </>
                  ) : (
                    <span>S/. {product.precio}</span>
                  )}
                </p>
                <div>
                  <div className="d-flex align-items-center g-10">
                    <Rating
                      className="product-rating mb-2"
                      value={product.rating_promedio}
                      onChange={setRating}
                      readOnly
                    />
                    <p className="main-product-rating mb-0">
                      ({product.numero_reviews} reviews)
                    </p>
                  </div>
                </div>
              </div>
              <div className="border-bottom">
                <div className="d-flex g-10 align-items-center my-2">
                  <h3 className="product-heading">Categorias</h3>
                  <p className="product-data">
                    {product.categorias.join(", ")}
                  </p>
                </div>
                <div className="d-flex g-10 align-items-center my-2">
                  <h3 className="product-heading">Stock</h3>
                  <p className="product-data">{product.stock}</p>
                </div>
                <div className="d-flex g-15 align-items-center flex-row mt-2 mb-3">
                  <h3 className="product-heading">Cantidad</h3>
                  <div>
                    <input
                      type="number"
                      className="quantity-control"
                      style={{ width: "50px" }}
                      value={quantity}
                      min={1}
                      max={10}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                    />
                  </div>
                  <div className="d-flex align-items-center g-30">
                    <button className="button">Agregar al carrito</button>
                    <button className="button">Comprar ahora</button>
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center g-30 mt-3">
                <div>
                  <a href="#" onClick={handleAddToWishlist}>
                    <FaRegHeart />
                    &nbsp;Agregar a la Lista de Deseos
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="description-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <h4>Descripcion</h4>
            <div className="bg-white p-3">
              <p>{product.descripcion}</p>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="reviews-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <h4>Reviews</h4>
            <div className="review-inner-wrapper">
              <div className="review-head d-flex justify-content-between align-items-end">
                <div>
                  <h4 className="mb-2"> Reviews de Clientes</h4>
                  <div className="d-flex align-items-center g-10">
                    <Rating
                      className="product-rating mb-2"
                      value={rating}
                      onChange={setRating}
                      readOnly
                    />
                    <p className="mb-0">
                      Basado en {product.numero_reviews} reviews
                    </p>
                  </div>
                </div>
                {orderedProducts && (
                  <div>
                    <a className="text-dark text-decoration-underline" href="">
                      Deja una review
                    </a>
                  </div>
                )}
              </div>
              <div className="review-form py-3">
                <h4>Escribe tu review</h4>
                <form onSubmit={handleReviewSubmit}>
                  <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">
                      Nombre
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="nombre"
                      placeholder="Ingresa tu nombre"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Ingresa tu correo electrónico"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="rating" className="form-label">
                      Rating
                    </label>
                    <div className="d-flex">
                      <Rating
                        className="product-rating mb-3"
                        value={rating}
                        onChange={setRating}
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="tituloReview" className="form-label">
                      Titulo de la review
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="tituloReview"
                      placeholder="Ingresa un titulo para tu review"
                      value={tituloReview}
                      onChange={(e) => setTituloReview(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="comentario" className="form-label">
                      Comentario
                    </label>
                    <textarea
                      className="form-control"
                      id="comentario"
                      rows="4"
                      placeholder="Ingresa tu comentario aquí"
                      value={comentario}
                      onChange={(e) => setComentario(e.target.value)}
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="button w-100">
                    Enviar review
                  </button>
                </form>
              </div>
              <div className="reviews mt-4">
                {product.reviews.map((review) => (
                  <div className="review" key={review._id}>
                    <div className="d-flex g-10 align-items-center">
                      <h6 className="mb-0">
                        {review.user || "Usuario Anónimo"}
                      </h6>
                      <Rating
                        className="product-rating mb-2"
                        value={review.rating}
                        readOnly
                      />
                    </div>
                    <h5 className="review-title mt-1">{review.titulo}</h5>
                    <p className="mt-3">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default SingleProduct;
