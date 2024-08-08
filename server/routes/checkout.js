const express = require('express');
const router = express.Router();
const mongojs = require('mongojs');

// If you use the shared MongoDB server:
const db = mongojs('mongodb+srv://Student:webdev2024student@cluster0.uqyflra.mongodb.net/webdev2024');
const orderCollection = db.collection('final_<Raziel_Oranit>_Orders');

router.post('/orders', (req, res) => {
    const orderData = req.body;

    orderCollection.insert(orderData, (err, result) => {
        if (err) {
            console.error('Failed to add order to MongoDB:', err);
            return res.status(500).json({ error: 'Failed to add order to MongoDB' });
        }
        console.log('Order added to MongoDB:', result);
        return res.status(200).json(result);
    });
});

module.exports = router;
