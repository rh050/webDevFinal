import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
export const Product = (props) => {
  const { id, productName, price,productImage,productDescription } = props.data;
  const { addToCart, cartItems, updateCartOnServer } = useContext(ShopContext);
  const cartItemCount = cartItems[id];


  return (
    <div className="product">
      <img src={productImage} alt={productName} />
      <div className="description">
        <p>
          <b>{productName}</b>
            <h2>{productDescription}</h2>
        </p>
        <p> ₪{price}</p>
      </div>
      <button className="addToCartBttn"  onClick={() => {addToCart(id);updateCartOnServer(id);}}
                                              >
        הוספה לעגלה {cartItemCount > 0 && <> ({cartItemCount})</>}
      </button>
    </div>
  );
};
