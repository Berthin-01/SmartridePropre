const express = require('express');
const app = express();

app.use(express.json());

// ============================================================
// ⚠️ CODE VOLONTAIREMENT SALE
// Une seule fonction avec un maximum de if/else imbriqués
// Complexité cyclomatique > 15
// ============================================================
app.post('/api/calculate-ride', (req, res) => {
    const body = req.body;
    const distance = body.distance;
    const type = body.type;
    const heure = body.heure;
    const statutClient = body.statutClient;
    const meteo = body.meteo;
    const annulation = body.annulation;
    const delaiAnnulation = body.delaiAnnulation;

    let prix = 5;

    // Calcul de la distance
    if (distance !== undefined && distance !== null) {
        if (distance <= 20) {
            prix = prix + distance * 1;
        } else {
            if (distance > 20) {
                prix = prix + 20 * 1;
                const distanceSupplementaire = distance - 20;
                if (distanceSupplementaire > 0) {
                    prix = prix + distanceSupplementaire * 0.8;
                } else {
                    prix = prix + 0;
                }
            } else {
                prix = prix + distance * 1;
            }
        }
    } else {
        prix = prix + 0;
    }

    // Type Premium
    if (type !== undefined && type !== null) {
        if (type === "Premium") {
            prix = prix * 1.3;
        } else {
            if (type === "Standard") {
                prix = prix * 1;
            } else {
                prix = prix * 1;
            }
        }
    } else {
        prix = prix * 1;
    }

    // Tarif nocturne (22h-6h)
    if (heure !== undefined && heure !== null) {
        if (heure >= 22 || heure < 6) {
            prix = prix + 8;
        } else {
            prix = prix + 0;
        }
    } else {
        prix = prix + 0;
    }

    // Remise fidélité
    if (statutClient !== undefined && statutClient !== null) {
        if (statutClient === "Fidèle") {
            prix = prix * 0.9;
        } else {
            prix = prix * 1;
        }
    } else {
        prix = prix * 1;
    }

    // Prime météo (sauf VIP)
    if (meteo !== undefined && meteo !== null) {
        if (meteo === "Pluie" || meteo === "Neige") {
            if (statutClient === "VIP") {
                prix = prix + 0;
            } else {
                prix = prix + 5;
            }
        } else {
            prix = prix + 0;
        }
    } else {
        prix = prix + 0;
    }

    // Gestion annulation
    if (annulation !== undefined && annulation !== null) {
        if (annulation === true) {
            if (delaiAnnulation !== undefined && delaiAnnulation !== null) {
                if (delaiAnnulation > 30) {
                    prix = 0;
                } else {
                    prix = 3;
                }
            } else {
                prix = 3;
            }
        }
    }

    const prixFinal = Math.round(prix * 100) / 100;

    return res.json({
        success: true,
        prix: prixFinal,
        devise: "EUR"
    });
});

// Route healthcheck
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