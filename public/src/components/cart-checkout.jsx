import React, { useContext } from "react";
import { ShopContext } from "../context/shop-context";

export const CartCheckout = (props) => {
    const { id, productName, price, productImage } = props.data;
    const { cartItems, addToCart, removeFromCart, updateCartItemCount, updateCartOnServer, updateCartOnServerReduce } = useContext(ShopContext);
    return (
        <div className="cartItem">
            <img src={productImage} alt={productName} />
            <div className="description">
                <p>
                    <b>{productName}</b>
                </p>
                <p>מחיר: ₪{price}</p>
                <p> כמות: {cartItems[id]}</p>
                <p> סה"כ: {cartItems[id]*price}</p>
            </div>
        </div>
    );

};
