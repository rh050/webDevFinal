import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../context/shop-context";
import { PRODUCTS } from "../../products";
import { CartCheckout } from "../../components/cart-checkout";
import "./checkout.css";
export const Checkout = () => {
    const { fetchCartItems, cartItems, getTotalCartAmount, checkout } = useContext(ShopContext);
    const totalAmount = getTotalCartAmount();
    const [totalAmountAfterShipping, setTotalAmountAfterShipping] = useState(totalAmount);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        totalAmountForm: ''
    });
    const [formErrors, setFormErrors] = useState({});
    const { v4: uuidv4 } = require('uuid');


    useEffect(() => {
        fetchCartItems();
        
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    
    const validateForm = () => {
        const errors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\d{10}$/;

        if (!formData.name.trim()) errors.name = "הכנס שם.";
        if (!emailRegex.test(formData.email)) errors.email = "הכנס כתובת אימייל תקינה.";
        if (!phoneRegex.test(formData.phone)) errors.phone = "הכנס מספר טלפון תקין (10 ספרות).";
        if (!formData.address.trim()) errors.address = "הכנס כתובת.";
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };
    
    const handleShippingChange = (e) => {
        const shippingValue = e.target.value;
        if (shippingValue === "express") {
            setTotalAmountAfterShipping(totalAmount + 30);
        } else {
            setTotalAmountAfterShipping(totalAmount);
        }
    };


    const handleFormSubmit = async (e) => {
        e.preventDefault();
        console.log("Form submission triggered");
        if (validateForm() && totalAmount !== 0) {
            try {
                const orderNumber = `ORD-${uuidv4()}`;
                const orderData = {
                    orderNumber,
                    customerDetails: {
                        name: formData.name,
                        email: formData.email,
                        phone: formData.phone,
                        address: formData.address,
                    },
                    cartItems: PRODUCTS.filter(product => cartItems[product.id] > 0).map(product => ({
                        productId: product.id,
                        name: product.name,
                        price: product.price,
                        quantity: cartItems[product.id],
                    })),
                    shippingMethod: document.querySelector('input[name="shipping"]:checked').value,
                    productPrices: totalAmount,
                    totalAmountAfterShipping: totalAmountAfterShipping,
                };

                const response = await fetch('http://localhost:5000/api/checkout/orders', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(orderData),
                });

                if (response.ok) {
                    alert('Order placed successfully!');
                    checkout();
                } else {
                    const errorMessage = await response.text();
                    console.error('Order submission failed:', errorMessage);
                    alert('Failed to place order. Please try again.');
                }
            } catch (error) {
                console.error('Error submitting order:', error);
                alert('An error occurred. Please try again.');
            }
            checkout();
            //refresh page
            
        }
    };

    return (
        <div className="checkout">
            <h1>Checkout</h1>
            <div className="cart">
                {PRODUCTS.map((product) => {
                    const quantity = cartItems[product.id];
                    if (quantity > 0) {
                        return <CartCheckout data={product} quantity={quantity} key={product.id}/>;
                    }
                    return null;
                })}
            </div>
            <div className={"shippingMethod"}>
                <h2>אפשרויות משלוח</h2>
                <div className="shippingOptions">
                    <label>
                        <input type="radio" name="shipping" value="standard" onChange={handleShippingChange} required/>
                        <span>משלוח רגיל (20 יום) - חינם</span>
                    </label>
                    <label>
                        <input type="radio" name="shipping" value="express" onChange={handleShippingChange}/>
                        <span>משלוח מהיר (3 ימים)- ₪30</span>
                    </label>
                </div>
            </div>
            <div className="form">
                <form onSubmit={handleFormSubmit}>
                    <label>
                        <input type="text" name="name" placeholder={"שם מלא"} value={formData.name}
                               onChange={handleInputChange} required/>
                        {formErrors.name && <p className="error">{formErrors.name}</p>}
                    </label>
                    <label>
                        <input type="email" name="email" placeholder={"כתובת אימייל"} value={formData.email}
                               onChange={handleInputChange} required/>
                        {formErrors.email && <p className="error">{formErrors.email}</p>}
                    </label>
                    <label>
                        <input type="text" name="phone" placeholder={"מספר פלאפון"} value={formData.phone}
                               onChange={handleInputChange} required/>
                        {formErrors.phone && <p className="error">{formErrors.phone}</p>}
                    </label>
                    <label>
                        <input type="text" name="address" placeholder={"כתובת למשלוח"} value={formData.address}
                               onChange={handleInputChange} required/>
                        {formErrors.address && <p className="error">{formErrors.address}</p>}
                    </label>
                    <button type="submit">שלח הזמנה</button>
                </form>
            </div>
            <div className="totalAmount">
                <p>סה"כ: ₪{totalAmountAfterShipping}</p>
            </div>
        </div>
    );
};
