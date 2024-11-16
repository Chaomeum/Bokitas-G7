import React from "react";
import { Link } from "react-router-dom";
import { FaYoutube, FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-5">
              <div className="footer-top-data d-flex g-30 align-items-center">
                <img src="images/newsletter.svg" alt="newsletter" />
                <h2 className="mb-0">
                  Suscribete a nuestra <br /> Newsletter
                </h2>
              </div>
            </div>
            <div className="col-7">
              <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control py-1"
                  placeholder="Correo Electronico"
                  aria-label="Correo Electronico"
                  aria-describedby="basic-addon2"
                />
                <span class="input-group-text p-2" id="basic-addon2">
                  Suscribete
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-4">
              <h4 className="mb-4">Contactanos</h4>
              <div>
                <address>
                  Av. de la Marina 2810, <br />
                  San Miguel 15087
                </address>
                <a
                  href="tel:+51 987654321"
                  className="text-dark mt-3 d-block mb-3"
                >
                  +51 987654321
                </a>
                <div className="social-icons d-flex align-items-center g-15">
                  <a
                    className="text-dark"
                    href="https://www.youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaYoutube className="fs-4" />
                  </a>
                  <a
                    className="text-dark"
                    href="https://www.linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLinkedin className="fs-4" />
                  </a>
                  <a
                    className="text-dark"
                    href="https://github.com/Chaomeum/Bokitas-G7"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithub className="fs-4" />
                  </a>
                  <a
                    className="text-dark"
                    href="https://www.instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaInstagram className="fs-4" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-3">
              <h4 className="mb-4">Informacion</h4>
              <div className="footer-links d-flex flex-column">
                <Link className="text-dark py-2 mb-0">
                  Terminos y condiciones
                </Link>
                <Link className="text-dark py-2 mb-0">
                  Politica de privacidad
                </Link>
                <Link className="text-dark py-2 mb-0">Politica de envios</Link>
                <Link className="text-dark py-2 mb-0">
                  Politica de reembolso
                </Link>
                <Link className="text-dark py-2 mb-0">Publicaciones</Link>
              </div>
            </div>
            <div className="col-3">
              <h4 className="mb-4">Cuenta</h4>
              <div className="footer-links d-flex flex-column">
                <Link className="text-dark py-2 mb-0">Buscar</Link>
                <Link className="text-dark py-2 mb-0">Nosotros</Link>
                <Link className="text-dark py-2 mb-0">
                  Preguntas frecuentes
                </Link>
                <Link className="text-dark py-2 mb-0">Contacto</Link>
              </div>
            </div>
            <div className="col-2">
              <h4 className="mb-4">Accede</h4>
              <div className="footer-links d-flex flex-column">
                <Link className="text-dark py-2 mb-0">Plantas Carnivoras</Link>
                <Link className="text-dark py-2 mb-0">Cuidado de plantas</Link>
                <Link className="text-dark py-2 mb-0">
                  Nuevas publicaciones
                </Link>
                <Link className="text-dark py-2 mb-0">Compras anteriores</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="text-center mb-0">
                &copy; {new Date().getFullYear()}; Proyecto Final G7.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
