"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)({ dest: "uploads/" });
const artwork_controllers_1 = __importDefault(require("./controllers/artwork-controllers"));
const user_controller_1 = __importDefault(require("./controllers/user-controller"));
router.get('/artwork', artwork_controllers_1.default.getArtwork);
router.post('/artwork', artwork_controllers_1.default.postArtwork);
router.get('/artwork/artist/:name', artwork_controllers_1.default.getArtist);
router.delete('/artwork/:id', artwork_controllers_1.default.deleteArt);
router.post('/artwork/art/upload', upload.single('image'), artwork_controllers_1.default.uploadImage);
//routes for user authentication and authorisation
router.post('/user/register', user_controller_1.default.postRegister);
router.post('/user/login', user_controller_1.default.postLogin);
router.get('/user', user_controller_1.default.getUser);
//updating user profile
router.post('/user/addFav', user_controller_1.default.putAddToFav);
router.post('/user/removeFav', user_controller_1.default.putRemoveFav);
exports.default = router;
