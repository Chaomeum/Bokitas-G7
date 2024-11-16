import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
    // Aquí puedes hacer una llamada a tu API para el inicio de sesión
  };

  return (
    <div className="login-wrapper py-5">
      <div className="container-xxl">
        <div className="row">
          <div className="col-12 col-md-6 offset-md-3">
            <h3 className="section-heading text-center">Iniciar Sesión</h3>
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Correo Electrónico</label>
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
                <label htmlFor="password" className="form-label">Contraseña</label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="button w-100">Ingresar</button>
              <div className="text-center mt-3">
                <p>
                  ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
