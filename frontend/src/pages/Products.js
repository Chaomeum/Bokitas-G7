import React from "react";

const Products = () => {
  return (
    <>
      <div className="products-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-3">
              <div className="filter-card mb-3">
                <h3 className="filter-title">Buscar por Categoria</h3>
                <div>
                  <ul className="filter-list ps-0">
                    <li>En Oferta</li>
                    <li>Accesorios de Cuidado</li>
                    <li>Ocasiones Especiales</li>
                  </ul>
                </div>
              </div>
              <div className="filter-card mb-3">
                <h3 className="filter-title">Filtrar por</h3>
                <div>
                  <h5 className="sub-title">Disponibilidad</h5>
                  <div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault"
                      >
                        Disponible
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault"
                      >
                        No Disponible
                      </label>
                    </div>
                  </div>
                  <h5 className="sub-title">Precio</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
