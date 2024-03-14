const request = require('supertest');
const app = require('../app');

let id;

test('GET /artists debe traer todos los artistas', async () => {
    const res = await request(app).get('/artists');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /artists debe crear un artista', async () => {
    const body = {
        name: "michael jackson",
        formationYear: 1976,
        country: "Estados Unidos",
        image: "http://cualquiercosa.com"
    }
    const res = await request(app).post('/artists').send(body);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(body.name);
});

test('PUT /artists/:id debe actualizar un artista', async () => {
    const body = {
        name: "michael actualizado"
    }
    const res = await request(app).put(`/artists/${id}`).send(body);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(body.name);
});

test('DELETE /artists/:id debe eliminar un artista', async () => {
    const res = await request(app).delete('/artists/'+id);
    expect(res.status).toBe(204);
});
