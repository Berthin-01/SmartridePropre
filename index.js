const express = require('express');
const { calculateRidePrice } = require('./src/services/rideService');

const app = express();
app.use(express.json());

app.post('/api/calculate-ride', (req, res) => {
    const result = calculateRidePrice(req.body);
    return res.json({
        success: true,
        prix: result.prix,
        devise: "EUR"
    });
});

app.get('/health', (req, res) => {
    return res.json({ status: 'OK' });
});

const PORT = 3000;

if (require.main === module) {
    app.listen(PORT, () => {
        console.log('SmartRide API sur http://localhost:' + PORT);
    });
}

module.exports = app;