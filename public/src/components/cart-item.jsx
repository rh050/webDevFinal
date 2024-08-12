import React, { useContext } from "react";
import { ShopContext } from "../context/shop-context";
import axios from "axios";

export const CartItem = (props) => {
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
        <div className="countHandler">
          <button onClick={() => { removeFromCart(id); updateCartOnServerReduce(id); }}> - </button>
          <input
            type="number"
            value={cartItems[id]}
            onChange={(e) => { updateCartItemCount(Number(e.target.value), id); updateCartOnServer(id); }}
          />
          <button onClick={() => { addToCart(id); updateCartOnServer(id); }}> + </button>
          <button onClick={() => { updateCartItemCount(0,id); updateCartOnServerReduce(id); }}> מחק </button>
          
        </div>
      </div>
    </div>
  );

};
