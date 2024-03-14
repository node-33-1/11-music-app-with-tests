const { getAll, create, getOne, remove, update } = require('../controllers/artist.controllers');
const express = require('express');

const artistRouter = express.Router();

artistRouter.route('/')
    .get(getAll)
    .post(create);

artistRouter.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = artistRouter;