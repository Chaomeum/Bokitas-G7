import React from "react";
import { Link } from "react-router-dom";
import PostCard from "../components/PostCard";
import ProductCard from "../components/ProductCard";
import Container from "../components/Container";
import { services } from "../utils/Data";

const Home = () => {
  return (
    <>
      <Container class1="home-wrapper-1 py-5">
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
      </Container>
      <Container class1="home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="services d-flex align-items-center justify-content-between">
              {services.map((i, j) => {
                return (
                  <div className="d-flex align-items-center g-15" key={j}>
                    <img src={i.image} alt="services" />
                    <div>
                      <h6>{i.title}</h6>
                      <p className="mb-0">{i.tagline}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
      <Container class1="featured-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Productos destacados</h3>
          </div>
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </Container>
      <Container class1="post-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Ultimas publicaciones</h3>
          </div>
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
        </div>
      </Container>
    </>
  );
};

export default Home;
