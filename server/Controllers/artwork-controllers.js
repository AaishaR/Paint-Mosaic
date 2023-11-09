'use strict';
const model = require('../models/db')

async function getArtwork(req, res) {
    try {
        const artwork = await model.getAllArtwork();
        res.status(200);
        res.send(artwork);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}
async function postArtwork(req, res) {
    try {
        const artwork = await model.addArtwork(req.body);
        res.status(201);
        res.send(artwork);

    } catch (e) {
        console.log(e);
        res.sendStatus(400);
    }
}

module.exports = { getArtwork, postArtwork }