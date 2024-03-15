const request = require('supertest');
const app = require('../app');
const Genre = require('../models/Genre');
const Song = require('../models/Song');

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

test('POST /artists/:id/genres debe insertar los géneros de un artista', async () => {
    const genre = await Genre.create({ name: 'Metal' });
    const res = await request(app)
        .post(`/artists/${id}/genres`)
        .send([genre.id]);
    await genre.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe('Metal');
});

test('POST /artists/:id/songs debe insertar las canciones de un artista', async () => {
    const song = await Song.create({
        name: 'test cancion',
    });
    const res = await request(app)
        .post(`/artists/${id}/songs`)
        .send([song.id]);
    await song.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe('test cancion');
});

test('POST /artists/:id/songs con id incorrecto debe retornar 404', async () => {
    const res = await request(app)
        .post(`/artists/-1/songs`)
        .send([]);
    expect(res.status).toBe(404);
});

test('DELETE /artists/:id debe eliminar un artista', async () => {
    const res = await request(app).delete('/artists/'+id);
    expect(res.status).toBe(204);
});

