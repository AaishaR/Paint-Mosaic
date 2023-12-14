'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const artworkModel = require('./artworkSchemas');
// const userModel = require('./userSchema');
// const mongoose = require('mongoose')
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: '../.env' });
async function db() {
    return mongoose_1.default.connect('mongodb://127.0.0.1:27017/mongooseDb').then(() => {
        console.log("🐸🐸  connected to Mongoooooooseeeee 🐸🐸 ");
        return mongoose_1.default.connection;
    });
}
exports.default = db;
