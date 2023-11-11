'use strict';
const model = require('../models/db');

async function getArtwork(req, res) {
    try {
        const artwork = await model.getAllArtwork();
        res.status(200);
        res.send(artwork);
    } catch (e) {
        console.log(e);
        res.status(500).json({ e: 'Internal Server Error' });
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

async function getArtist(req, res) {
    try {
        // console.log(req.params.name)
        const artwork = await model.findArtist(req.params.name);
        // console.log(artwork);
        res.status(200);
        res.send(artwork);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}

async function deleteArt(req, res) {
    try {
        const artwork = await model.deleteArtwork(req.params.id);
        res.status(201);
        res.send(JSON.stringify({ messgae: 'artwork deleted' }));

    } catch (e) {
        console.log(e);
        res.status(500);
    }
}

module.exports = { getArtwork, postArtwork, getArtist, deleteArt }