import React from "react";
import { Link } from "react-router-dom";
import PostCard from "../components/PostCard";
import ProductCard from "../components/ProductCard";

const Home = () => {
  return (
    <>
      <section className="home-wrapper-1 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <div className="main-banner position-relative">
                <img
                  src="images/droseraspatulata.jpg"
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                <div className="main-banner-content position-absolute">
                  <h4>Tu planta chill</h4>
                  <h5>Drosera Spatulata</h5>
                  <p>
                    Desde S/. 75 <br />
                    Incluye maceta
                  </p>
                  <Link className="button">COMPRAR AHORA</Link>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="d-flex flex-wrap g-10 justify-content-betwee align-items-center">
                <div className="small-banner position-relative">
                  <img
                    src="images/bokitasimg2.jpg"
                    className="img-fluid rounded-3"
                    alt="main banner"
                  />
                  <div className="small-banner-content position-absolute">
                    <h4>Planta mas vendida</h4>
                    <h5>Venus atrapamosca</h5>
                    <p>
                      Desde S/. 125 <br />
                      Incluye maceta <br />y accesorios
                    </p>
                  </div>
                </div>
                <div className="small-banner position-relative">
                  <img
                    src="images/utricularia.jpeg"
                    className="img-fluid rounded-3"
                    alt="main banner"
                  />
                  <div className="small-banner-content position-absolute">
                    <h4>Ultima novedad</h4>
                    <h5>Utricularia Alpina</h5>
                    <p>
                      Desde S/. 125 <br />
                      Incluye maceta <br />y accesorios
                    </p>
                  </div>
                </div>
                <div className="small-banner position-relative">
                  <img
                    src="images/droseracapensis.png"
                    className="img-fluid rounded-3"
                    alt="main banner"
                  />
                  <div className="small-banner-content position-absolute">
                    <h4>Mejor calificada</h4>
                    <h5>Drosera Capensis</h5>
                    <p>
                      Desde S/. 125 <br />
                      Incluye maceta <br />y accesorios
                    </p>
                  </div>
                </div>
                <div className="small-banner position-relative">
                  <img
                    src="images/pinguicula-ag.jpg"
                    className="img-fluid rounded-3"
                    alt="main banner"
                  />
                  <div className="small-banner-content position-absolute">
                    <h4>Con mas comentarios</h4>
                    <h5>Pinguicula Agnata</h5>
                    <p>
                      Desde S/. 60 <br />
                      Incluye maceta <br />y accesorios
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="services d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center g-15">
                  <img src="images/delivery.svg" alt="services" />
                  <div>
                    <h6>Envios gratis</h6>
                    <p className="mb-0">En pedidos de mas de S/.50</p>
                  </div>
                </div>
                <div className="d-flex align-items-center g-15">
                  <img src="images/discount.svg" alt="services" />
                  <div>
                    <h6>Ofertas semanales</h6>
                    <p className="mb-0">Ahorra hasta un 20%</p>
                  </div>
                </div>
                <div className="d-flex align-items-center g-15">
                  <img src="images/service.svg" alt="services" />
                  <div>
                    <h6>Soporte 24/7</h6>
                    <p className="mb-0">Asesorate con expertos</p>
                  </div>
                </div>
                <div className="d-flex align-items-center g-15">
                  <img src="images/wishlist.svg" alt="services" />
                  <div>
                    <h6>Precios de regalo</h6>
                    <p className="mb-0">Accesible para todos</p>
                  </div>
                </div>
                <div className="d-flex align-items-center g-15">
                  <img src="images/card.svg" alt="services" />
                  <div>
                    <h6>Pagos seguros</h6>
                    <p className="mb-0">Tus pagos estan protegidos</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="featured-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="col-12">
            <h3 className="section-heading">Productos destacados</h3>
          </div>
          <div className="row">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
        </div>
      </section>      
      <section className="post-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="col-12">
            <h3 className="section-heading">Ultimas publicaciones</h3>
          </div>
          <div className="row">
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
