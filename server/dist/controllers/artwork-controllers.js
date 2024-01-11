"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const artworkSchemas_1 = __importDefault(require("../models/artworkSchemas"));
const userUtils_1 = require("../utils/userUtils");
const getArtwork = async (req, res) => {
    try {
        const artwork = await artworkSchemas_1.default.find();
        return res.json(artwork);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ error: 'Internal Server Error' });
        // res.status(500).json({ e: 'Internal Server Error' });
    }
};
const postArtwork = async (req, res) => {
    try {
        const validUser = (0, userUtils_1.validateUser)(req);
        if (!validUser)
            return res.status(401).json({ error: "Authentication failed" });
        const artwork = await artworkSchemas_1.default.create(req.body);
        return res.status(201).json({ stauts: 201, message: 'Successfully created artwork', artwork: artwork });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ error: "Internal server error" });
    }
};
const getArtist = async (req, res) => {
    try {
        // console.log(req.params)
        const artwork = await artworkSchemas_1.default.find({ "artistId": req.params.artistId });
        // console.log(artwork);
        return res.status(201).json({ stauts: 201, message: 'got artist', artwork: artwork });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
const deleteArt = async (req, res) => {
    try {
        const artwork = await artworkSchemas_1.default.deleteOne({ _id: req.params.id });
        res.status(201);
        return res.status(201).json({ stauts: 201, message: 'Successfully deleted atwork', artwork: artwork });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.default = { getArtwork, postArtwork, getArtist, deleteArt };
