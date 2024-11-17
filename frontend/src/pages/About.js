import React, { useEffect, useState } from "react";
import instance from "../utils/api";

const About = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Función para obtener las categorías desde el backend
  const fetchCategories = async () => {
    try {
      const response = await instance.get("/api/category");
      setCategories(response.data); // Asume que `response.data` contiene la lista de categorías
      setLoading(false);
    } catch (err) {
      setError("Error al cargar las categorías");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) {
    return <div>Cargando categorías...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="about-page">
      <h1>Categorías</h1>
      <ul>
        {categories.map((category) => (
          <li key={category._id}>
            <h2>{category.nombre}</h2>
            <p>{category.descripcion || "Sindescripción"}</p>
            <p>
              <strong>Código:</strong> {category.codigo}
            </p>
            <p>
              <strong>Slug:</strong> {category.slug}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default About;