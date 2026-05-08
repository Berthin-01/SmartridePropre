function applyLoyaltyDiscount(prix, statutClient) {
    if (statutClient === "Fidèle") {
        return prix * 0.9;
    }
    return prix;
}

module.exports = { applyLoyaltyDiscount };