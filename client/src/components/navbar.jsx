import React, {useContext, useEffect} from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "phosphor-react";
import { ShopContext } from "../context/shop-context";
import "./navbar.css";
import { Cart } from "./cart";

export const Navbar = ({ isCartOpen, toggleCart }) => {
    const { cartItems,getTotalCartAmount } = useContext(ShopContext);
    let totalItems = 0;
    Object.keys(cartItems).forEach((key) => {
        totalItems += cartItems[key];
    });
    useEffect(() => {
        document.body.style.flex = isCartOpen ? "hidden" : "auto";
    }, [isCartOpen]);
    
    return (
        <div className="navbar">
            <div className="links">
                <Link to="/">Shop</Link>

                <div className="cartIcon" onClick={toggleCart}>
                    <ShoppingCart size={32}/>
                </div>

                {isCartOpen && (
                    <div className="cartBox">
                        <Cart toggleCart={toggleCart}/>
                    </div>
                )}
                <div className="cartItems"> {totalItems} 
                </div>
                <div className="cartTotal">₪{getTotalCartAmount()}</div>
            </div>
        </div>
    );
};
