function applyWeatherCharge(prix, meteo, statutClient) {
    const isBadWeather = meteo === "Pluie" || meteo === "Neige";
    if (isBadWeather && statutClient !== "VIP") {
        return prix + 5;
    }
    return prix;
}

module.exports = { applyWeatherCharge };