"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const artworkSchemas_1 = __importDefault(require("./artworkSchemas"));
const MsgSchema = {
    sender: {
        type: String,
        required: true,
    },
    msg: {
        type: String,
    }
};
const UserSchema = {
    username: {
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
    messages: [MsgSchema],
    favoriteArtworks: [artworkSchemas_1.default.schema],
};
const User = mongoose.model('user', UserSchema);
exports.default = User;
