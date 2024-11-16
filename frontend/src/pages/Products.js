import React from "react";
import ProductCard from "../components/ProductCard";

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
                  <div className="d-flex align-items-center g-10">
                    <div className="form-floating mb-3">
                      <input
                        type="email"
                        className="form-control"
                        id="floatingInput"
                        placeholder="Desde"
                      />
                      <label htmlFor="floatingInput">Desde</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        type="email"
                        className="form-control"
                        id="floatingInput"
                        placeholder="Hasta"
                      />
                      <label htmlFor="floatingInput">Hasta</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-9">
              <div className="filter-sort-grid mb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center g-10">
                    <p className="mb-0">Ordenar por:</p>
                    <select name="" id="" className="form-control form-select">
                      <option value="most-sold">Mas vendidos</option>
                      <option value="price-asc">Precio (Menor a Mayor)</option>
                      <option value="price-desc">Precio (Mayor a Menor)</option>
                      <option value="title-asc">Alfabeticamente A-Z</option>
                      <option value="title-desc">Alfabeticamente Z-A</option>
                    </select>
                  </div>
                  <div className="d-flex align-items-center g-10">
                    <p className="total-products">3 productos encontrados</p>
                  </div>
                </div>
              </div>
              <div className="products-list d-flex pb-5">
                <ProductCard />
                <ProductCard />
                <ProductCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
