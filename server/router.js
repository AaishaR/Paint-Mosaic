'use strict';

const router = require('express').Router();
const { getArtwork, postArtwork, getAtrist } = require('./controllers/artwork-controllers')

router.get('/artwork', getArtwork);
router.post('/artwork', postArtwork);
router.get('/artwork/artist/:name', getAtrist);

module.exports = router;