function applyPremiumCharge(prix, type) {
    if (type === "Premium") {
        return prix * 1.3;
    }
    return prix;
}

module.exports = { applyPremiumCharge };