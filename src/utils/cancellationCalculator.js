function calculateCancellationFees(annulation, delaiAnnulation) {
    if (!annulation) {
        return 0;
    }
    if (delaiAnnulation > 30) {
        return 0;
    }
    return 3;
}

module.exports = { calculateCancellationFees };