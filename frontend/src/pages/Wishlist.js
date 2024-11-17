import React from "react";
import Container from "../components/Container";

const Wishlist = () => {
  const wishlistItems = [
    // Ejemplo de datos. Estos podrían ser traídos desde el backend con una llamada a la API.
    {
      id: 1,
      image: "https://via.placeholder.com/150",
      name: "Planta Carnívora Venus",
      price: "$25.00",
      isInStock: true,
    },
    {
      id: 2,
      image: "https://via.placeholder.com/150",
      name: "Terrario Decorativo",
      price: "$40.00",
      isInStock: false,
    },
  ];

  return (
    <>
      <Container class1="wishlist-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Lista de Deseos</h3>
            {wishlistItems.length > 0 ? (
              <div className="wishlist-items">
                {wishlistItems.map((item) => (
                  <div
                    key={item.id}
                    className="wishlist-item d-flex align-items-center justify-content-between mb-3"
                  >
                    <div className="item-details d-flex align-items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="wishlist-item-image"
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                        }}
                      />
                      <div className="item-info ms-3">
                        <h5 className="item-name">{item.name}</h5>
                        <p className="item-price">{item.price}</p>
                        <p
                          className={`stock-status ${
                            item.isInStock ? "text-success" : "text-danger"
                          }`}
                        >
                          {item.isInStock ? "En stock" : "Agotado"}
                        </p>
                      </div>
                    </div>
                    <div className="item-actions">
                      {item.isInStock && (
                        <button className="button me-2">
                          Agregar al Carrito
                        </button>
                      )}
                      <button className="button button-danger">Eliminar</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center">Tu lista de deseos está vacía.</p>
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

export default Wishlist;
