import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import api from "../utils/api";

const Header = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.get("/api/user/logout");
      localStorage.removeItem("user");
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <>
      <header className="header-upper py-3">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-3 d-flex align-items-center">
              <img className="img-logo" src="/images/bokitaslogo.webp" alt="" />
              <h2>
                <Link className="text-dark">Bokitas</Link>
              </h2>
            </div>
            <div className="col-4">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control py-2"
                  placeholder="Busca tu planta carnivora"
                  aria-label="Busca tu planta carnivora"
                  aria-describedby="basic-addon2"
                />
                <span className="input-group-text" id="basic-addon2">
                  <BsSearch />
                </span>
              </div>
            </div>
            <div className="col-5">
              <div className="header-upper-links d-flex align-items-center justify-content-between">
                <div>
                  {user ? (
                    <div className="dropdown">
                      <button
                        className="btn btn-secondary dropdown-toggle bg-transparent border-0 text-dark g-15 d-flex align-items-center"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <img src="/images/user.svg" alt="cuenta" />
                        <span>
                          Hola,
                          <br />
                          {user.nombre}
                        </span>
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <Link className="dropdown-item" to="/profile">
                            Perfil
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/orders">
                            Mis Pedidos
                          </Link>
                        </li>
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={handleLogout}
                          >
                            Cerrar Sesión
                          </button>
                        </li>
                      </ul>
                    </div>
                  ) : (
                    <Link
                      to="/login"
                      className="d-flex align-item-center g-10 text-dark"
                    >
                      <img src="/images/user.svg" alt="cuenta" />
                      <p className="mb-0">
                        Iniciar <br /> Sesión
                      </p>
                    </Link>
                  )}
                </div>
                <div>
                  <Link
                    to="/wishlist"
                    className="d-flex align-item-center g-10 text-dark"
                  >
                    <img src="/images/wishlist.svg" alt="wishlist" />
                    <p className="mb-0">
                      Lista de <br />
                      Deseos
                    </p>
                  </Link>
                </div>
                <div>
                  <Link
                    to="/cart"
                    className="d-flex align-item-center g-10 text-dark"
                  >
                    <img src="/images/cart.svg" alt="carrito" />
                    <div className="d-flex flex-column g-10">
                      <span className="badge bg-dark text-white">0</span>
                      <p className="mb-0">S/. 0.0</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <header className="header-lower py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-11">
              <div className="menu-bottom d-flex align-items-center g-25">
                <div>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle bg-transparent border-0 text-dark g-15 d-flex align-items-center"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img src="images/menu.svg" alt="" />
                      <span>Categorias</span>
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <Link className="dropdown-item" to="#">
                          Action
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="#">
                          Another action
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="#">
                          Something else here
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="menu-links">
                  <div className="d-flex align-items-center g-15">
                    <NavLink to="/">Inicio</NavLink>
                    <NavLink to="/products">Nuestros Productos</NavLink>
                    <NavLink to="/posts">Publicaciones</NavLink>
                    <NavLink to="/contact">Contacto</NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
