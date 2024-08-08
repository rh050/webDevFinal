const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongojs = require('mongojs');
const cartRoutes = require('./routes/cart');
const checkoutRoutes = require('./routes/checkout'); // Import the checkout routes

const app = express();

app.use(express.json()); // Middleware to parse JSON body

// Use CORS middleware to allow cross-origin requests
app.use(cors());

// Serve static files from the 'static' directory
app.use(express.static('static'));

// Define a simple route
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Use the cart routes
app.use('/api/cart', cartRoutes);
app.use('/api/checkout', checkoutRoutes); // Use the checkout routes

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
