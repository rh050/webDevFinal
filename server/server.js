const express = require('express');
const cors = require('cors');
const cartRoutes = require('./routes/cart');
const checkoutRoutes = require('./routes/checkout'); 

const app = express();

app.use(express.json()); 

app.use(cors());

app.use(express.static('static'));

// Define a simple route
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Use the cart routes
app.use('/api/cart', cartRoutes);
app.use('/api/checkout', checkoutRoutes); 

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
