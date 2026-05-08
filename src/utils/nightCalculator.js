function applyNightCharge(prix, heure) {
    if (heure >= 22 || heure < 6) {
        return prix + 8;
    }
    return prix;
}

module.exports = { applyNightCharge };