import { createContext, useEffect, useState } from "react";
import { PRODUCTS } from "../products";
import axios from "axios";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let i = 1; i < PRODUCTS.length + 1; i++) {
    cart[i] = 0;
  }
  return cart;
};


export const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());



  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = PRODUCTS.find((product) => product.id === Number(item));
        totalAmount += cartItems[item] * itemInfo.price;
      }
    }
    return totalAmount;
  };

  const addToCart = async (itemId) => {
    setCartItems((prev) => {
      const newCartItems = { ...prev, [itemId]: prev[itemId] + 1 };
     return newCartItems;
    });
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      const newCartItems = { ...prev, [itemId]: prev[itemId] - 1 };
        return newCartItems;
    });
  };

  const updateCartItemCount = async (newAmount, itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
  };

 const updateCartOnServer = async (itemId) => {
        const product = PRODUCTS.find((product) => product.id === itemId);
        const newProduct = { product: {...product, quantity: cartItems[product.id]+1} };

        axios.post("http://localhost:5000/api/cart/update", newProduct)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const updateCartOnServerReduce = async (itemId) => {
            const product = PRODUCTS.find((product) => product.id === itemId);
            const newProduct = { product: {...product, quantity: cartItems[product.id]-1} };

            axios.post("http://localhost:5000/api/cart/update", newProduct)
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                });
        };


const fetchCartItems = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/cart/cartLoad");
    const cartData = response.data;
    cartData.forEach((item) => {
      const newAmount = item.quantity > 0 ? item.quantity : 0;
      if (newAmount > 0)
        updateCartItemCount(newAmount, item.id);
    });
  } catch (error){
        console.error("Failed to fetch cart items:", error);
  }
};

useEffect(() => {fetchCartItems();}, []);


const checkout = async () => {
setCartItems(getDefaultCart());
};

  const contextValue = {
    cartItems,
    addToCart,
    updateCartItemCount,
    removeFromCart,
    getTotalCartAmount,
    updateCartOnServer,
    updateCartOnServerReduce,
    checkout,
    fetchCartItems,
  };

  return (
      <ShopContext.Provider value={contextValue}>
        {props.children}
      </ShopContext.Provider>
  );


};



