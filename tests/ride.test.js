const request = require('supertest');
const app = require('../index');

describe('SmartRide API - Tests', () => {

    // Test 1 : Course standard 10km
    test('Course standard 10km en journée', async () => {
        const response = await request(app)
            .post('/api/calculate-ride')
            .send({
                distance: 10,
                type: 'Standard',
                heure: 14,
                statutClient: 'Nouveau',
                meteo: 'Beau',
                annulation: false
            });

        expect(response.status).toBe(200);
        expect(response.body.prix).toBe(15);
    });

    // Test 2 : Course longue distance 30km
    test('Course longue distance 30km', async () => {
        const response = await request(app)
            .post('/api/calculate-ride')
            .send({
                distance: 30,
                type: 'Standard',
                heure: 14,
                statutClient: 'Nouveau',
                meteo: 'Beau',
                annulation: false
            });

        expect(response.status).toBe(200);
        expect(response.body.prix).toBe(33);
    });

    // Test 3 : Course Premium (+30%)
    test('Course Premium avec majoration 30%', async () => {
        const response = await request(app)
            .post('/api/calculate-ride')
            .send({
                distance: 10,
                type: 'Premium',
                heure: 14,
                statutClient: 'Nouveau',
                meteo: 'Beau',
                annulation: false
            });

        expect(response.status).toBe(200);
        expect(response.body.prix).toBe(19.5);
    });

    // Test 4 : Tarif nocturne (+8€)
    test('Course de nuit (23h)', async () => {
        const response = await request(app)
            .post('/api/calculate-ride')
            .send({
                distance: 10,
                type: 'Standard',
                heure: 23,
                statutClient: 'Nouveau',
                meteo: 'Beau',
                annulation: false
            });

        expect(response.status).toBe(200);
        expect(response.body.prix).toBe(23);
    });

    // Test 5 : Client fidèle (-10%)
    test('Client fidèle avec remise 10%', async () => {
        const response = await request(app)
            .post('/api/calculate-ride')
            .send({
                distance: 10,
                type: 'Standard',
                heure: 14,
                statutClient: 'Fidèle',
                meteo: 'Beau',
                annulation: false
            });

        expect(response.status).toBe(200);
        expect(response.body.prix).toBe(13.5);
    });

    // Test 6 : Météo pluie (+5€)
    test('Météo Pluie - client normal', async () => {
        const response = await request(app)
            .post('/api/calculate-ride')
            .send({
                distance: 10,
                type: 'Standard',
                heure: 14,
                statutClient: 'Nouveau',
                meteo: 'Pluie',
                annulation: false
            });

        expect(response.status).toBe(200);
        expect(response.body.prix).toBe(20);
    });

    // Test 7 : VIP pas de prime météo
    test('Météo Pluie - client VIP (pas de prime)', async () => {
        const response = await request(app)
            .post('/api/calculate-ride')
            .send({
                distance: 10,
                type: 'Standard',
                heure: 14,
                statutClient: 'VIP',
                meteo: 'Pluie',
                annulation: false
            });

        expect(response.status).toBe(200);
        expect(response.body.prix).toBe(15);
    });

    // Test 8 : Annulation tardive
    test('Annulation tardive (10min) = 3€', async () => {
        const response = await request(app)
            .post('/api/calculate-ride')
            .send({
                annulation: true,
                delaiAnnulation: 10
            });

        expect(response.status).toBe(200);
        expect(response.body.prix).toBe(3);
    });

    // Test 9 : Annulation anticipée
    test('Annulation anticipée (45min) = 0€', async () => {
        const response = await request(app)
            .post('/api/calculate-ride')
            .send({
                annulation: true,
                delaiAnnulation: 45
            });

        expect(response.status).toBe(200);
        expect(response.body.prix).toBe(0);
    });

    // Test 10 : Healthcheck
    test('Route healthcheck', async () => {
        const response = await request(app).get('/health');
        expect(response.status).toBe(200);
        expect(response.body.status).toBe('OK');
    });
});