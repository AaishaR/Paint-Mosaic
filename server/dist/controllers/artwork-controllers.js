"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const artworkSchemas_1 = __importDefault(require("../models/artworkSchemas"));
const cloudinary_1 = require("cloudinary");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: '../.env' });
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
        // console.log(req.params.name)
        const artwork = await artworkSchemas_1.default.find({ "artist.name": req.params.name });
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
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const uploadImage = async (req, res) => {
    try {
        console.log("Received image upload request");
        if (!req.file) {
            res.status(400).json({ error: "No image uploaded" });
        }
        else {
            const result = await cloudinary_1.v2.uploader.upload(req.file.path, {
                quality: "auto",
                fetch_format: "auto",
            });
            const imageUrl = result.url;
            res.json({ imageUrl });
        }
    }
    catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
        res.status(500).json({ error: "Failed to upload image" });
    }
};
exports.default = { getArtwork, postArtwork, getArtist, deleteArt, uploadImage };
