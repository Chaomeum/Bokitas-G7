import React, { useState } from "react";
import Container from "../components/Container";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      setLoading(true);
      const response = await api.post("/api/user/register", {
        nombre: formData.name,
        email: formData.email,
        password: formData.password,
      });
      console.log("Usuario registrado:", response.data);
      alert("Registro exitoso");
      setLoading(false);
      navigate("/login"); // Redirige al login tras el registro
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Error al registrar usuario");
    }
  };

  return (
    <Container class1="register-wrapper py-5">
      <div className="row">
        <div className="col-12 col-md-6 offset-md-3">
          <h3 className="section-heading text-center">Registro</h3>
          {error && <div className="alert alert-danger">{error}</div>}
          <form className="register-form" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
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
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirmar Contraseña
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="form-control"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="button w-100" disabled={loading}>
              {loading ? "Registrando..." : "Registrarse"}
            </button>
            <div className="text-center mt-3">
              <p>
                ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default Register;
