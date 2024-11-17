import React from "react";
import Container from "../components/Container";
import PostCard from "../components/PostCard";

const Posts = () => {
  return (
    <>
      <Container class1="posts-wrapper home-wrapper-2 py-5">
        <div className="row">
          {/* Filtros a la izquierda */}
          <div className="col-3">
            <div className="filter-card mb-3">
              <h3 className="filter-title">Buscar por Categoria</h3>
              <div>
                <ul className="filter-list ps-0">
                  <li>Consejos de Cuidado</li>
                  <li>Novedades</li>
                  <li>Historias de Clientes</li>
                </ul>
              </div>
            </div>
            <div className="filter-card mb-3">
              <h3 className="filter-title">Filtrar por</h3>
              <div>
                <h5 className="sub-title">Popularidad</h5>
                <div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="popularPosts"
                    />
                    <label className="form-check-label" htmlFor="popularPosts">
                      Más populares
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="recentPosts"
                    />
                    <label className="form-check-label" htmlFor="recentPosts">
                      Más recientes
                    </label>
                  </div>
                </div>
                <h5 className="sub-title">Comentarios</h5>
                <div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="mostComments"
                    />
                    <label className="form-check-label" htmlFor="mostComments">
                      Más comentados
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Lista de publicaciones */}
          <div className="col-9">
            <div className="filter-sort-grid mb-4">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center g-10">
                  <p className="mb-0">Ordenar por:</p>
                  <select name="" id="" className="form-control form-select">
                    <option value="most-liked">Más gustados</option>
                    <option value="most-recent">Más recientes</option>
                    <option value="most-commented">Más comentados</option>
                  </select>
                </div>
                <div className="d-flex align-items-center g-10">
                  <p className="total-posts">10 publicaciones encontradas</p>
                </div>
              </div>
            </div>
            <div className="posts-list d-flex pb-5">
              <PostCard />
              <PostCard />
              <PostCard />
              <PostCard />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Posts;
