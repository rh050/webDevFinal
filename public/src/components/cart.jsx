// src/components/cart.jsx
import React, { useContext } from "react";
import { ShopContext } from "../context/shop-context";
import { PRODUCTS } from "../products";
import { CartItem } from "./cart-item";
import { useNavigate } from "react-router-dom";
import "./cart.css";

export const Cart = ({ toggleCart }) => {
    const { cartItems, getTotalCartAmount, checkout } = useContext(ShopContext);
    const totalAmount = getTotalCartAmount();
    const navigate = useNavigate();

    return (
        <div className="cart">
            <div>
                <h1>המוצרים שלך</h1>
            </div>
            <div className="cart">
                {PRODUCTS.map((product) => {
                    if (cartItems[product.id] !== 0) {
                        return <CartItem data={product} key={product.id} />;
                    }
                    return null;
                })}
            </div>

            {totalAmount > 0 ? (
                <div className="checkout">
                    <p> סה"כ: ₪{totalAmount} </p>
                    <button
                        onClick={() => {
                            toggleCart();  // Close the cart
                            checkout();
                            navigate("/checkout");
                        }}
                    >
                        {" "}
                        לקופה{" "}
                    </button>
                </div>
            ) : (
                <h1> אין לך מוצרים, הוסף מוצרים.</h1>
            )}
        </div>
    );
};
