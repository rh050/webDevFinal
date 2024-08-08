//checkout page
import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import axios from "axios";
import {CartItem} from "../../components/cart-item";
import  "./checkoutForm.css";
export const CheckoutForm = (props) => {
    return (

<div className="form-container">
    <form id="form" method="post" className="aligned-form" action="/">
        <h1>Registration</h1>
        <div className="input-control">
            <label htmlFor="firstname">First name:</label>
            <input type="text" id="firstname" name="firstname" placeholder="Enter your first name" required/>
            <div className="error"></div>
        </div>
        <div className="input-control">
            <label htmlFor="lastname">Last name:</label>
            <input type="text" id="lastname" name="lastname" placeholder="Enter your last name" required/>
            <div className="error"></div>
        </div>
        <div className="input-control">
            <label htmlFor="phonenumber">Phone Number:</label>
            <input type="tel" id="phonenumber" name="phonenumber" placeholder="Enter your phone number" required/>
            <div className="error"></div>
        </div>
        <div className="input-control">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="Enter your email" required/>
            <div className="error"></div>
        </div>
        <div className="input-control">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" placeholder="Enter your password" minLength="8"
                   required/>
            <div className="error"></div>
        </div>
        <div className="input-control">
            <label htmlFor="confirm_password">Confirm Password:</label>
            <input type="password" id="confirm_password" name="confirm_password" placeholder="Confirm your password"
                   minLength="8" required/>
            <div className="error"></div>
        </div>
        <button type="submit">Sign Up</button>
    </form>
</div>
    );
}