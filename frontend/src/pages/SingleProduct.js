import React, { useState } from "react";
import { Rating } from "@smastrom/react-rating";
import { FaRegHeart } from "react-icons/fa";

const SingleProduct = () => {
  const [rating, setRating] = useState(0);
  const [orderedProducts] = useState(true);
  return (
    <>
      <div className="main-product-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <div className="product-image">
                <img src="images/droseracapensis.png" alt="Planta Carnívora" />
              </div>
            </div>
            <div className="col-6">
              <div className="product-details">
                <div className="border-bottom">
                  <h3 className="product-title mb-2">Drosera Capensis</h3>
                </div>
                <div className="border-bottom">
                  <p className="product-price mt-2">S/. 50.00</p>
                  <div>
                    <div className="d-flex align-items-center g-10">
                      <Rating
                        className="product-rating mb-2"
                        value={rating}
                        onChange={setRating}
                        readOnly
                      />
                      <p className="main-product-rating mb-0">(2 reviews)</p>
                    </div>
                  </div>
                </div>
                <div className="border-bottom">
                  <div className="d-flex g-10 align-items-center my-2">
                    <h3 className="product-heading">Categorias</h3>
                    <p className="product-data">
                      Oferta del mes, Planta Carnivora
                    </p>
                  </div>
                  <div className="d-flex g-10 align-items-center my-2">
                    <h3 className="product-heading">Stock</h3>
                    <p className="product-data">21</p>
                  </div>
                  <div className="d-flex g-15 align-items-center flex-row mt-2 mb-3">
                    <h3 className="product-heading">Cantidad</h3>
                    <div>
                      <input
                        type="number"
                        className="quantity-control"
                        style={{ width: "50px" }}
                        name=""
                        min={1}
                        max={10}
                        id=""
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
                    <a href="">
                      <FaRegHeart />
                      &nbsp;Agregar a la Lista de Deseos
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="description-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h4>Descripcion</h4>
              <div className="bg-white p-3">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Cupiditate ab molestiae sunt nam suscipit iste provident, ut
                  quibusdam, voluptatem praesentium non soluta quia in vitae!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="reviews-wrapper home-wrapper-2">
        <div className="container-xxl">
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
                      <p className="mb-0">Basado en 2 reviews</p>
                    </div>
                  </div>
                  {orderedProducts && (
                    <div>
                      <a
                        className="text-dark text-decoration-underline"
                        href=""
                      >
                        Deja una review
                      </a>
                    </div>
                  )}
                </div>
                <div className="review-form py-3">
                  <h4>Escribe tu review</h4>
                  <form>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                        Nombre
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Ingresa tu nombre"
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
                      <label htmlFor="title-review" className="form-label">
                        Titulo de la review
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="title-review"
                        placeholder="Ingresa un titulo para tu review"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="message" className="form-label">
                        Comentario
                      </label>
                      <textarea
                        className="form-control"
                        id="message"
                        rows="4"
                        placeholder="Ingresa tu comentario aquí"
                      ></textarea>
                    </div>
                    <button type="submit" className="button w-100">
                      Enviar review
                    </button>
                  </form>
                </div>
                <div className="reviews mt-4">
                  <div className="review">
                    <div className="d-flex g-10 align-items-center">
                      <h6 className="mb-0">Jhon</h6>
                      <Rating
                        className="product-rating mb-2"
                        value={rating}
                        onChange={setRating}
                        readOnly
                      />
                    </div>
                    <p className="mt-3">
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Quam, officiis?
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleProduct;
