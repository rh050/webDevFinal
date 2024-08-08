import React from "react";
import { PRODUCTS } from "../../products";
import { Product } from "./product";
import "./shop.css";
import Banner from "../../assets/banner.jpg";

export const Shop = () => {
    return (
    <div className="shop">
    <div className="shopTitle">
        <h1> לך לך</h1>
        <img className="banner" src={Banner } alt="Banner" />
        <h5> חנות שתגרום לך ללכת ברגל ימין </h5>
    </div>
    <div className="products">
        {PRODUCTS.map((product) => (
        <Product data={product}/>
    ))}
    </div>

    </div>
    );
};

