"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const artworkSchemas_1 = __importDefault(require("./artworkSchemas"));
const UserSchema = {
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['buyer', 'seller'],
        required: true,
    },
    favoriteArtworks: [artworkSchemas_1.default.schema],
};
const User = mongoose.model('user', UserSchema);
exports.default = User;
