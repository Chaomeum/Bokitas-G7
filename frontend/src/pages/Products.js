import React, { useState, useEffect } from "react";
import Container from "../components/Container";
import ProductCard from "../components/ProductCard";
import api from "../utils/api";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/api/product"); // Llama al endpoint de tu backend
        setProducts(response.data.data.products); // Guarda los productos en el estado
        setLoading(false); // Cambia el estado de carga
      } catch (err) {
        setError(err.message || "Error al cargar los productos");
        setLoading(false); // Cambia el estado de carga
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Container class1="products-wrapper home-wrapper-2 py-5">
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
              {loading && <p>Cargando productos...</p>}
              {error && <p className="text-danger">{error}</p>}
              {!loading && !error && products.length === 0 && (
                <p>No se encontraron productos.</p>
              )}
              {!loading &&
                !error &&
                products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Products;
