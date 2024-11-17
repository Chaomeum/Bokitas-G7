import React, { useState } from "react";
import Container from "../components/Container";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook para redireccionar

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/api/user/login", { email, password });
      // Guardar token en localStorage o context
      localStorage.setItem("user", JSON.stringify(response.data));
      console.log("Usuario autenticado:", response.data);
      setError(""); // Limpia el mensaje de error
      navigate("/"); // Redirige al homepage o dashboard
    } catch (err) {
      console.error(
        "Error en el inicio de sesión:",
        err.response?.data?.message || err.message
      );
      setError(
        err.response?.data?.message || "Ocurrió un error, intente nuevamente."
      );
    }
  };

  return (
    <>
      <Container class1="login-wrapper py-5">
        <div className="row">
          <div className="col-12 col-md-6 offset-md-3">
            <h3 className="section-heading text-center">Iniciar Sesión</h3>
            {error && <div className="alert alert-danger">{error}</div>}
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="button w-100">
                Ingresar
              </button>
              <div className="text-center mt-3">
                <p>
                  ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Login;
