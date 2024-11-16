import React from "react";

const Contact = () => {
  return (
    <>
      <div className="contact-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            {/* Sección de información de contacto */}
            <div className="col-6">
              <div className="contact-info">
                <h3 className="contact-title">Información de Contacto</h3>
                <p>
                  ¿Tienes dudas o consultas? Escríbenos, estaremos encantados de
                  ayudarte.
                </p>
                <ul className="contact-details ps-0">
                  <li>
                    <strong>Dirección:</strong> Av. de la Marina 2810, San
                    Miguel 15087
                  </li>
                  <li>
                    <strong>Teléfono:</strong> +51 987 654 321
                  </li>
                  <li>
                    <strong>Email:</strong> contacto@bokitas.com
                  </li>
                  <li>
                    <strong>Horario:</strong> Lunes a Sábado, 9:00 AM - 6:00 PM
                  </li>
                </ul>
              </div>
            </div>

            {/* Sección de formulario de contacto */}
            <div className="col-6">
              <div className="contact-form">
                <h3 className="contact-title">Escríbenos</h3>
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
                  <div className="mb-3">
                    <label htmlFor="message" className="form-label">
                      Mensaje
                    </label>
                    <textarea
                      className="form-control"
                      id="message"
                      rows="4"
                      placeholder="Escribe tu mensaje aquí"
                    ></textarea>
                  </div>
                  <button type="submit" className="button w-100">
                    Enviar
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Mapa de ubicación */}
          <div className="row mt-5">
            <div className="col-12">
              <h3 className="section-heading">Encuéntranos aquí</h3>
              <div className="map-container mt-3">
                <iframe
                  title="map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1950.7575059504422!2d-77.09438667279252!3d-12.076854043886376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c96528ea4a55%3A0x85a66d70e40870dd!2sUPC%20-%20Campus%20San%20Miguel!5e0!3m2!1ses-419!2spe!4v1731789474728!5m2!1ses-419!2spe"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
