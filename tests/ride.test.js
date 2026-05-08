const request = require('supertest');
const app = require('../index');

describe('SmartRide API - Tests', () => {

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

    test('Route healthcheck', async () => {
        const response = await request(app).get('/health');
        expect(response.status).toBe(200);
        expect(response.body.status).toBe('OK');
    });
});