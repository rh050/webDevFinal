const express = require('express');
const mongojs = require("mongojs");
const router = express.Router();

// MongoDB setup we use two collections for products 'final_<Raziel_Oranit>' and for orders 'final_<Raziel_Oranit>_Orders'
const db = mongojs('mongodb+srv://Student:webdev2024student@cluster0.uqyflra.mongodb.net/webdev2024');
const tasks_coll = db.collection('final_<Raziel_Oranit>');

// In-memory cart for simplicity
let cart = [];

//import products quantity from cart on server
    const cartLoad = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/cart/cartLoad");
        cartItems.forEach((item) => {
        cartItems[item.id]=response.find((product) => product.id === item.id).quantity;
        });
        } catch (error) {
        console.error(error);
        }
    };

/// Fetch cart items
 router.get('/cartLoad', (req, res) => {
     tasks_coll.find((err, cartItems) => {
         if (err) {
             return res.status(500).send({ error: 'Failed to fetch cart items from MongoDB' });
         }
         res.status(200).json(cartItems);
     });
 });


// Handle the update request
router.post('/update', (req, res) => {
    const { product } = req.body;

    console.log('Received request to add product to cart:', product);

    if (!product) {
        console.error('Product data is missing');
        return res.status(400).json({ error: 'Product data is required' });
    }

    tasks_coll.findOne({ id: product.id }, (err, doc) => {
        if (err) {
            console.error('Failed to find product in MongoDB:', err);
            return res.status(500).json({ error: 'Failed to find product in MongoDB' });
        }

        if (doc) {
            // Remove product if quantity is 0
            if (product.quantity === 0) {
                tasks_coll.remove({ id: product.id }, (err, result) => {
                    if (err) {
                        console.error('Failed to remove product from MongoDB:', err);
                        return res.status(500).json({ error: 'Failed to remove product from MongoDB' });
                    }
                    console.log('Product removed from MongoDB:');
                    return res.status(200).json(result);
                });
            } else {
                // Update product quantity
                tasks_coll.update({ id: product.id }, { $set: { quantity: product.quantity } }, (err, result) => {
                    if (err) {
                        console.error('Failed to update product in MongoDB:', err);
                        return res.status(500).json({ error: 'Failed to update product in MongoDB' });
                    }
                    console.log('Product updated in MongoDB');
                    return res.status(200).json(result);
                });
            }
        } else {
            // Add product to cart
            tasks_coll.insert(product, (err, result) => {
                if (err) {
                    console.error('Failed to add product to MongoDB:', err);
                    return res.status(500).json({ error: 'Failed to add product to MongoDB' });
                }
                console.log('Product added to MongoDB');
                return res.status(200).json(result);
            });
        }
    });
});

module.exports = router;
