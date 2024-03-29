"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const ArtworkSchema = {
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    price: {
        type: String,
        required: true,
    },
    material: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    artistId: {
        type: String,
        required: true,
    }
};
const artworkModel = mongoose.model('artwork', ArtworkSchema);
exports.default = artworkModel;
