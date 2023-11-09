'use strict';

const router = require('express').Router();
const { getArtwork, postArtwork } = require('./controllers/artwork-controllers')

router.get('/artwork', getArtwork);
router.post('/artwork', postArtwork);

module.exports = router;