"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const artwork_controllers_1 = __importDefault(require("./controllers/artwork-controllers"));
const user_controller_1 = __importDefault(require("./controllers/user-controller"));
// const userController = require('./controllers/user-controller');
// const authMiddleware = require('./middlewares/auth');
router.get('/artwork', artwork_controllers_1.default.getArtwork);
router.post('/artwork', artwork_controllers_1.default.postArtwork);
router.get('/artwork/artist/:name', artwork_controllers_1.default.getArtist);
router.delete('/artwork/:id', artwork_controllers_1.default.deleteArt);
//routes for user authentication and authorisation
router.post('/user/register', user_controller_1.default.postRegister);
router.post('/user/login', user_controller_1.default.postLogin);
// router.get('/user/profile', authMiddleware, userController.profile);
// router.post('/user/logout', authMiddleware, userController.logout);
router.get('/user', user_controller_1.default.getUser);
//updating user profile
router.post('/user/addFav', user_controller_1.default.putAddToFav);
router.post('/user/removeFav', user_controller_1.default.putRemoveFav);
router.post('/user/addmsg', user_controller_1.default.putAddMsg);
exports.default = router;
