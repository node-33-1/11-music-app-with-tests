const { getAll, create, getOne, remove, update, setArtistGenres, setArtistSongs } = require('../controllers/artist.controllers');
const express = require('express');

const artistRouter = express.Router();

artistRouter.route('/') // artists
    .get(getAll)
    .post(create);

artistRouter.route('/:id') // /artists/:id
    .get(getOne)
    .delete(remove)
    .put(update);

artistRouter.route('/:id/genres') // /artists/:id/genres
    .post(setArtistGenres);

artistRouter.route('/:id/songs')
    .post(setArtistSongs);

module.exports = artistRouter;
