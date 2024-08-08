// src/App.jsx
import React, { useState } from 'react'; // Import useState from React
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from './components/navbar';
import { Shop } from './pages/shop/shop';
import { Checkout } from './pages/checkout/checkout';
import { ShopContextProvider } from "./context/shop-context";
import './App.css';

export const App = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    return (
        <div className="App">
            <ShopContextProvider>
                <Router>
                    <Navbar isCartOpen={isCartOpen} toggleCart={toggleCart} />
                    <Routes>
                        <Route path="/" element={<Shop />} />
                        <Route path="/checkout" element={<Checkout />} />
                    </Routes>
                </Router>
            </ShopContextProvider>
        </div>
    );
};

export default App;
