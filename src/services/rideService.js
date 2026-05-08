const { calculateDistanceCost } = require('../utils/distanceCalculator');
const { applyPremiumCharge } = require('../utils/premiumCalculator');
const { applyNightCharge } = require('../utils/nightCalculator');
const { applyLoyaltyDiscount } = require('../utils/loyaltyCalculator');
const { applyWeatherCharge } = require('../utils/weatherCalculator');
const { calculateCancellationFees } = require('../utils/cancellationCalculator');

const PRIX_BASE = 5;

function calculateRidePrice(params) {
    const {
        distance,
        type,
        heure,
        statutClient,
        meteo,
        annulation,
        delaiAnnulation
    } = params;

    // Si annulation, retourner uniquement les frais
    if (annulation) {
        return {
            prix: calculateCancellationFees(annulation, delaiAnnulation)
        };
    }

    // Calcul du prix normal
    let prix = PRIX_BASE;
    prix += calculateDistanceCost(distance);
    prix = applyPremiumCharge(prix, type);
    prix = applyNightCharge(prix, heure);
    prix = applyWeatherCharge(prix, meteo, statutClient);
    prix = applyLoyaltyDiscount(prix, statutClient);

    const prixFinal = Math.round(prix * 100) / 100;

    return { prix: prixFinal };
}

module.exports = { calculateRidePrice };