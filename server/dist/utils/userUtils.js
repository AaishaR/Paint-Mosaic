"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenToUserId = exports.validateUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const userSchema_1 = __importDefault(require("../models/userSchema"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, '..', '..', '.env') });
//todo, change not to any
async function validateUser(req) {
    try {
        const { authorization } = req.headers;
        if (!authorization)
            return false;
        // console.log(authorization)
        const userId = tokenToUserId(authorization);
        // console.log(userId);
        if (!userId)
            return false;
        const user = await userSchema_1.default.findOne({ _id: userId });
        // console.log('found user: ', user)
        if (!user)
            return false;
        return { userId, user };
    }
    catch (error) {
        throw error;
    }
}
exports.validateUser = validateUser;
function tokenToUserId(token) {
    const SECRET_KEY = process.env.SECRET_KEY;
    try {
        const decodedToken = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        return decodedToken._id;
    }
    catch (error) {
        return undefined;
    }
}
exports.tokenToUserId = tokenToUserId;
