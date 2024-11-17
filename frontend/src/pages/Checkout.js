import React from "react";
import { Link } from "react-router-dom";

const Checkout = () => {
  return (
    <>
      <section className="checkout-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12 col-md-8">
              <div className="checkout-form">
                <h4 className="mb-4">Detalles de Facturación</h4>
                <form action="">
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Ingresa tu nombre"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="ejemplo@correo.com"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      id="phone"
                      placeholder="999-999-999"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="address" className="form-label">
                      Dirección
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      placeholder="Calle, número, ciudad, etc."
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="notes" className="form-label">
                      Notas del Pedido (Opcional)
                    </label>
                    <textarea
                      id="notes"
                      className="form-control"
                      rows="3"
                      placeholder="¿Algo que deberíamos saber?"
                    ></textarea>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="order-summary p-3 bg-light">
                <h4 className="mb-4">Resumen del Pedido</h4>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <p>Producto 1</p>
                  <p>S/.50</p>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <p>Producto 2</p>
                  <p>S/.50</p>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <strong>Subtotal</strong>
                  <strong>S/.100</strong>
                </div>
                <button className="button w-100">Realizar Pedido</button>
                <div className="mt-3 text-center">
                  <Link to="/cart" className="text-decoration-underline">
                    Volver al carrito
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Checkout;
