'use strict';

const router = require('express').Router();
const { getArtwork, postArtwork, getArtist, deleteArt } = require('./controllers/artwork-controllers')

router.get('/artwork', getArtwork);
router.post('/artwork', postArtwork);
router.get('/artwork/artist/:name', getArtist);
router.delete('/artwork/:id', deleteArt);

module.exports = router;