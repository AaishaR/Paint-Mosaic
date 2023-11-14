'use strict';

const router = require('express').Router();
const { getArtwork, postArtwork, getArtist, deleteArt } = require('./controllers/artwork-controllers');
const userController = require('./controllers/user-controller');
const authMiddleware = require('./middlewares/auth');

router.get('/artwork', getArtwork);
router.post('/artwork', postArtwork);
router.get('/artwork/artist/:name', getArtist);
router.delete('/artwork/:id', deleteArt);

//routes for user authentication and authorisation

router.post('/user/register', userController.create);
router.post('/user/login', userController.login);
// router.get('/user/profile', authMiddleware, userController.profile);
router.post('/user/logout', authMiddleware, userController.logout);
router.get('/user', userController.getUser);

//updating user profile

router.post('/user/addFav', userController.addtofav);
router.post('/user/removeFav', userController.removeFav);
router.post('/user/addmsg', userController.addMsg);

module.exports = router;