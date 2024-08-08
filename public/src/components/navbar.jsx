// src/components/navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "phosphor-react";
import "./navbar.css";
import { Cart } from "./cart";

export const Navbar = ({ isCartOpen, toggleCart }) => {
    return (
        <div className="navbar">
            <div className="links">
                <Link to="/">Shop</Link>

                <div className="cartIcon" onClick={toggleCart}>
                    <ShoppingCart size={32} />
                </div>

                {isCartOpen && (
                    <div className="cartBox">
                        <Cart toggleCart={toggleCart} />
                    </div>
                )}
            </div>
        </div>
    );
};
