function calculateDistanceCost(distance) {
    if (distance <= 20) {
        return distance * 1;
    }
    return 20 * 1 + (distance - 20) * 0.8;
}

module.exports = { calculateDistanceCost };