import React from "react";
import Container from "../components/Container";
import { Link } from "react-router-dom";
import { RiDeleteBin6Fill } from "react-icons/ri";

const Cart = () => {
  return (
    <>
      <Container class1="cart-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="cart-header py-3 d-flex justify-content-between align-items-center">
              <h4 className="cart-col-1">Producto</h4>
              <h4 className="cart-col-2">Precio</h4>
              <h4 className="cart-col-3">Cantidad</h4>
              <h4 className="cart-col-4">Total</h4>
            </div>
            <div className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center">
              <div className="cart-col-1 d-flex g-15 align-items-center">
                <div className="w-25">
                  <img src="" className="img-fluid" alt="" />
                </div>
                <div className="w-75">
                  <p>Producto 1</p>
                </div>
              </div>
              <div className="cart-col-2">
                <h5 className="price">S/.50</h5>
              </div>
              <div className="cart-col-3 d-flex align-items-center g-10">
                <div>
                  <input
                    type="number"
                    className="quantity-control"
                    style={{ width: "50px" }}
                    name=""
                    min={1}
                    max={10}
                    id=""
                  />
                </div>
                <div>
                  <RiDeleteBin6Fill className="text-danger" />
                </div>
              </div>
              <div className="cart-col-4">
                <h5 className="price">S/.50</h5>
              </div>
            </div>
            <div className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center">
              <div className="cart-col-1 d-flex g-15 align-items-center">
                <div className="w-25">
                  <img src="" className="img-fluid" alt="" />
                </div>
                <div className="w-75">
                  <p>Producto 2</p>
                </div>
              </div>
              <div className="cart-col-2">
                <h5 className="price">S/.50</h5>
              </div>
              <div className="cart-col-3 d-flex align-items-center g-10">
                <div>
                  <input
                    type="number"
                    className="quantity-control"
                    style={{ width: "50px" }}
                    name=""
                    min={1}
                    max={10}
                    id=""
                  />
                </div>
                <div>
                  <RiDeleteBin6Fill className="text-danger" />
                </div>
              </div>
              <div className="cart-col-4">
                <h5 className="price">S/.50</h5>
              </div>
            </div>
          </div>
          <div className="col-12 py-2">
            <div className="d-flex justify-content-between align-items-baseline">
              <Link to="/products" className="button">
                Sigue comprando
              </Link>
              <div className="d-flex flex-column align-items-end">
                <h4>Subtotal: S/.100</h4>
                <Link to="/checkout" className="button">
                  Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Cart;
