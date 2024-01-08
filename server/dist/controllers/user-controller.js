"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userSchema_1 = __importDefault(require("./../models/userSchema"));
const userUtils_1 = require("../utils/userUtils");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: '../.env' });
// const SECRET_KEY  = process.env.SECRET_KEY!;
const postRegister = async (req, res) => {
    const { email, password, role } = req.body;
    if (!email || !password || !role)
        return res.status(400).json({ error: "Credentials not provided correctly" });
    const user = await userSchema_1.default.findOne({ email: email });
    console.log('this is the found user ', user);
    if (user)
        return res.status(400).json({ error: "Account with this username already exists" });
    try {
        if (password === '')
            throw new Error();
        const hash = await bcrypt_1.default.hash(password, 10);
        const newUser = new userSchema_1.default({
            ...req.body,
            password: hash,
        });
        const { _id } = await newUser.save();
        // console.log('_id:', _id);
        // console.log('SECRET_KEY:', SECRET_KEY);
        const accessToken = jsonwebtoken_1.default.sign({ _id }, process.env.SECRET_KEY);
        console.log(accessToken);
        return res.status(201).json({ accessToken });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
const postLogin = async (req, res) => {
    // console.log(req.body)
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({ error: "Credentials not provided correctly" });
        const user = await userSchema_1.default.findOne({ email });
        if (!user)
            return res.status(400).json({ error: "User does not exists" });
        const validatedPass = await bcrypt_1.default.compare(password, user.password);
        if (!validatedPass)
            return res.status(401).json({ error: "Incorrect password" });
        const accessToken = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.SECRET_KEY);
        return res.status(200).json({ accessToken, userDetails: user });
        // res.status(200).send({ accessToken, userDetails: user });
    }
    catch (error) {
        return res.status(500).send({ error: '500', message: 'Username or password is incorrect' });
    }
};
const getUser = async (req, res) => {
    try {
        const validatedUser = await (0, userUtils_1.validateUser)(req);
        if (!validatedUser || !validatedUser.userId || !validatedUser.user)
            return res.status(401).json({ error: validatedUser });
        const { user } = validatedUser;
        // console.log(user);
        return res.status(200).send(user);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error in getUser" });
    }
};
const putAddToFav = async (req, res) => {
    // console.log(req.body)
    try {
        const { _id, artwork } = req.body;
        const user = await userSchema_1.default.findById(_id);
        user.favoriteArtworks.push(artwork);
        await user.save();
        // await userModel.addFavoriteArtwork(_id, artwork);
        return res.status(200).json({ success: true, message: 'Artwork added to favorites successfully' });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
const putRemoveFav = async (req, res) => {
    try {
        const { _id, artworkId } = req.body;
        const user = await userSchema_1.default.findById(_id);
        if (!user) {
            console.error('User not found');
            return res.status(400).json({ error: "User does not exists" });
        }
        user.favoriteArtworks = user.favoriteArtworks.filter((el) => el._id.toString() !== artworkId);
        await user.save();
        // await userModel.removeFavoriteArtwork(_id, artworkId);
        return res.status(200).json({ success: true, message: 'Artwork removed from favorites successfully' });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
exports.default = { postRegister, postLogin, getUser, putAddToFav, putRemoveFav };
